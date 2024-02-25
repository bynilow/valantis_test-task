import { IProduct } from './../../models/IProduct';
import axios from "axios";
import { fetchAllUniqueIds, fetchProductsData, fetchIdsWithFilter, fetchUniqueIds, fetchAllBrands } from "../../api/fetchProducts";
import { AppDispatch } from "../store";
import { productSlice } from "./ProductSlice";
import { getUniqueProducts } from '../../functions/getUniqueProducts';

export const fetchAllIdsAC = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));

        const idsProducts = await fetchAllUniqueIds();
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

export const fetchIdsWithFiltersAC = (price: string, brand: string, name: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.setIsLoading(true));
        if(price.trim() === '' && brand === 'All' && name.trim() === ''){
            dispatch(productSlice.actions.setupSearchedProductsIdFromStore());
            const responseIds = await fetchUniqueIds(0, 50);
            dispatch(fetchProductsAC(responseIds));
        }
        else{
            let idsPrice: string[] = [];
            let idsBrand: string[] = [];
            let idsName: string[] = [];
    
            if (price !== '' && parseInt(price.replace(/\s/g,''))){
                const responsePrice = await fetchIdsWithFilter({
                    filter: 'price',
                    value: parseInt(price.replace(/\s/g,''))
                });
    
                idsPrice = [...responsePrice];
            }
            if(brand.trim() !== 'All'){
                const responseBrand = await fetchIdsWithFilter({
                    filter: 'brand',
                    value: brand.trim()
                });
    
                idsBrand = [...responseBrand];
            }
            if(name.trim() !== ''){
                const responseName = await fetchIdsWithFilter({
                    filter: 'product',
                    value: name.toLocaleLowerCase().trim()
                });
    
                idsName = [...responseName];
            }
            let ids:string[] = [];
            ids = [...idsName, ...idsBrand, ...idsPrice]
                .filter(id => idsName.length || name.trim() ? idsName.includes(id) : true)
                    .filter(id => idsBrand.length ? idsBrand.includes(id) : true)
                        .filter(id => idsPrice.length ? idsPrice.includes(id) : true)
                        
            const spliced = [...ids].splice(0, 50)
            dispatch(productSlice.actions.setSearchedProductsId(Array.from(new Set(ids))));
    
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
        const responseIds = await fetchUniqueIds(0, 50);
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
        const brands = await fetchAllBrands();

        dispatch(productSlice.actions.setAllBrands(brands));
    }
    catch (e: any) {
        dispatch(productSlice.actions.setError(e.message));
        console.error(e.message);
    }
}