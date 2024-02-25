import { IProduct } from './../../models/IProduct';
import axios from "axios";
import { fetchAllUniqueProductsId, fetchProductsData, fetchProductsIdWithFilter, fetchUniqueProductIds } from "../../api/fetchProducts";
import { AppDispatch } from "../store";
import { productSlice } from "./ProductSlice";
import { getUniqueProducts } from '../../functions/getUniqueProducts';

export const fetchAllProductIdsAC = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));

        const idsProducts = await fetchAllUniqueProductsId();
        await dispatch(productSlice.actions.setAllProductsId(idsProducts));
        await dispatch(productSlice.actions.setSearchedProductsId(idsProducts));
        const dataProducts: IProduct[] = await fetchProductsData([...idsProducts].splice(0,50));

        const uniqueProducts = await getUniqueProducts(dataProducts);
        dispatch(productSlice.actions.setProducts(uniqueProducts));

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

        await dispatch(productSlice.actions.setProducts([]));
        const sliced = ids.splice(0,50);
        console.log(sliced)
        const dataProducts = await fetchProductsData(sliced);
        const uniqueProducts = await getUniqueProducts(dataProducts);
        await dispatch(productSlice.actions.setProducts(uniqueProducts));

        dispatch(productSlice.actions.setIsLoading(false));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
    }
}

export const fetchProductsIdWithFiltersAC = (price: string, brand: string, name: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));
        console.log(price.trim(), brand, name.trim())
        if(price.trim() === '' && brand === 'All' && name.trim() === ''){
            dispatch(productSlice.actions.setupSearchedProductsIdFromStore());
            const responseIds = await fetchUniqueProductIds(0, 50);
            dispatch(fetchProductsAC(responseIds));
        }
        else{
            let idsPrice: string[] = [];
            let idsBrand: string[] = [];
            let idsName: string[] = [];
    
            if (price !== '' && parseInt(price)){
                const responsePrice = await fetchProductsIdWithFilter({
                    filter: 'price',
                    value: parseInt(price)
                });
    
                idsPrice = [...responsePrice];
            }
            if(brand.trim() !== 'All'){
                const responseBrand = await fetchProductsIdWithFilter({
                    filter: 'brand',
                    value: brand.trim()
                });
    
                idsBrand = [...responseBrand];
            }
            if(name.trim() !== ''){
                const responseName = await fetchProductsIdWithFilter({
                    filter: 'product',
                    value: name.trim()
                });
    
                idsName = [...responseName];
            }
            let ids:string[] = [];
            if(idsName.length){
                ids = idsName
                    .filter(id => idsBrand.length ? idsBrand.includes(id) : true)
                        .filter(id => idsPrice.length ? idsPrice.includes(id) : true);
            }
            if(idsBrand.length){
                ids = idsBrand
                    .filter(id => idsName.length ? idsName.includes(id) : true)
                        .filter(id => idsPrice.length ? idsPrice.includes(id) : true);
            }
            if(idsPrice.length){
                ids = idsPrice
                    .filter(id => idsBrand.length ? idsBrand.includes(id) : true)
                        .filter(id => idsName.length ? idsName.includes(id) : true);
            }    
            const spliced = [...ids].splice(0, 50)
            console.log(spliced)
            dispatch(productSlice.actions.setSearchedProductsId(ids));
    
            dispatch(fetchProductsAC(spliced));
        }

        dispatch(setPageAC(0));

    }
    catch (e: any) {
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(productSlice.actions.setError(e.message));
        console.error(e);
    }
}

export const setSearchedProductsIdFromStoreAC = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));

        await dispatch(productSlice.actions.setupSearchedProductsIdFromStore());
        dispatch(productSlice.actions.setupSearchedProductsIdFromStore());
        const responseIds = await fetchUniqueProductIds(0, 50);
        dispatch(fetchProductsAC(responseIds));

        await dispatch(productSlice.actions.setPage(0));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setIsLoading(false));
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
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
            "action": "get_fields",
            "params": {"field": "brand"}
        });
        const brands: string[] = responseBrands.data.result;
        const filteredBrands = Array.from(new Set(brands.filter(i => !!i)));

        dispatch(productSlice.actions.setAllBrands(filteredBrands));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
    }
}