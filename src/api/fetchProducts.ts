import axios from "axios";
import axiosRetry from "axios-retry";
var md5 = require('md5');

axiosRetry(axios, { retries: 3 });
axiosRetry(axios, {
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        if (error.response === undefined) {

        }
        return true;
    }
});
const timestamp = new Date().toISOString().split('T')[0].split('-').join('');
const md = md5(`Valantis_${timestamp}`);
axios.defaults.headers.post['X-Auth'] = md;

const URL = 'https://api.valantis.store:41000/';

export const fetchAllUniqueIds = async () => {
    const responseIds = await axios.post(URL, {
        "action": "get_ids"
    });
    const data: string[] = responseIds.data.result;

    return Array.from(new Set(data));
}

export const fetchUniqueIds = async (offset: number, limit: number) => {
    const responseIds = await axios.post(URL, {
        "action": "get_ids",
        "params": {
            "offset": offset,
            "limit": limit
        }
    });
    const data: string[] = responseIds.data.result;

    return Array.from(new Set(data));
}

export const fetchProductsData = async (ids: string[]) => {
    const cachedProducts = sessionStorage.getItem(`${JSON.stringify(ids)}`);

    if(cachedProducts){
        return JSON.parse(cachedProducts);
    } 

    const responseProducts = await axios.post(URL, {
        "action": "get_items",
        "params": { "ids": ids }
    })

    const data = responseProducts.data.result;

    sessionStorage.setItem(`${JSON.stringify(ids)}`, JSON.stringify(data))
    return data
}

interface IPriceFilter {
    filter: 'price';
    value: number;
}
interface IBrandFilter {
    filter: 'brand';
    value: string;
}
interface INameFilter {
    filter: 'product';
    value: string;
}
type Filter = INameFilter | IBrandFilter | IPriceFilter;

export const fetchIdsWithFilter = async ({filter, value}:Filter) => { 
    const cachedIds = sessionStorage.getItem(`${filter}: ${value}`);
    if(cachedIds){
        return JSON.parse(cachedIds);
    } 

    const responseIds = await axios.post(URL, {
        "action": "filter",
        "params": {
            [filter]: value
        }
    });
    const data: string[] = responseIds.data.result;
    const setted = Array.from(new Set(data));

    sessionStorage.setItem(`${filter}: ${value}`, JSON.stringify(setted));
    return setted
}

export const fetchAllBrands = async () => {
    const responseBrands = await axios.post(URL, {
        "action": "get_fields",
        "params": { "field": "brand" }
    });
    const brands: string[] = responseBrands.data.result;

    return Array.from(new Set(brands.filter(i => !!i)));
};