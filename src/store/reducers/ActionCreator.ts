import axios from "axios";
import { AppDispatch } from "../store";
import { productSlice } from "./ProductSlice";
import { IProduct } from "../../models/IProduct";
import axiosRetry from "axios-retry";

axiosRetry(axios, {retries: 3});
axiosRetry(axios, { 
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        if(error.response === undefined){

        }
        return true;
    }
});

var md5 = require('md5');

const timestamp = new Date().toISOString().split('T')[0].split('-').join('');
const md = md5(`Valantis_${timestamp}`);
axios.defaults.headers.post['X-Auth'] = md;

console.log(md)

export const fetchAllProductsIdAC = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));

        const responseIds = await axios.post('http://api.valantis.store:40000/', {
            "action": "get_ids"
        });
        const data: string[] = responseIds.data.result;
        const setted = Array.from(new Set(data));
        dispatch(productSlice.actions.setAllProductsId(setted));
        dispatch(productSlice.actions.setSearchedProductsId(setted));

        const responseProducts = await axios.post('http://api.valantis.store:40000/', {
            "action": "get_items",
            "params": { "ids": setted.slice(0, 50) }
        })
        dispatch(productSlice.actions.setProducts(responseProducts.data.result))

        dispatch(productSlice.actions.setIsLoading(false));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
    }
}

export const fetchProductsAC = (ids: string[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));

        const responseProducts = await axios.post('http://api.valantis.store:40000/', {
            "axios-retry": {retries: 3},
            "action": "get_items",
            "params": {"ids": ids}
        });
        const products: IProduct[] = responseProducts.data.result;
        console.log(products)

        await dispatch(productSlice.actions.setProducts(products));
        dispatch(productSlice.actions.setIsLoading(false));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
    }
}


export const fetchProductsIdWithNameAC = (name: string, offset: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));

        if(name.trim() !== ''){
            const responseIds = await axios.post('http://api.valantis.store:40000/', {
                "action": "filter",
                "params": {
                    "product": name.toLowerCase().trim()
                }
            });
    
            const data: string[] = responseIds.data.result;
            const setted = Array.from(new Set(data));
            dispatch(productSlice.actions.setSearchedProductsId(setted));
    
            const spliced = await [...setted].splice(offset, offset + limit);
            const responseProducts = await axios.post('http://api.valantis.store:40000/', {
                "action": "get_items",
                "params": { "ids": spliced }
            })
    
            console.log('responseProducts', responseProducts)
    
            await dispatch(productSlice.actions.setProducts(responseProducts.data.result));
        }
        else{
            dispatch(productSlice.actions.setupSearchedProductsIdFromStore());
        }
        
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(setPageAC(0));

    }
    catch (e: any) {
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(productSlice.actions.setError(e.message));
        console.error(e);
    }
}

export const setPageAC = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setPage(page));
    }
    catch (e: any) {
        console.error(e.message);
    }
}


export const fetchAllBrandsAC = () => async (dispatch: AppDispatch) => {
    try {
        const responseBrands = await axios.post('http://api.valantis.store:40000/', {
            "axios-retry": {retries: 3},
            "action": "get_fields",
            "params": {"field": "brand"}
        });
        const brands: string[] = responseBrands.data.result;
        const filteredBrands = Array.from(new Set(brands.filter(i => !!i)));
        console.log(filteredBrands)

        dispatch(productSlice.actions.setAllBrands(filteredBrands));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
    }
}