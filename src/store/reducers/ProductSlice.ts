import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct";

interface IInitialState {
    allProductsId: string[];
    searchedProductsId: string[];
    products: IProduct[];
    allBrands: string[];
    pageNumber: number;
    isLoading: boolean;
    error: string;
}

const initialState: IInitialState = {
    allProductsId: [],
    searchedProductsId: [],
    products: [],
    allBrands: [],
    pageNumber: 0,
    isLoading: false,
    error: ''
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            if (action.payload) state.error = '';
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setPage(state, action: PayloadAction<number>){
            state.pageNumber = action.payload
        },
        setAllProductsId(state, action: PayloadAction<string[]>){
            state.allProductsId = action.payload;
        },
        setupSearchedProductsIdFromStore(state){
            state.searchedProductsId = state.allProductsId;
        },
        setSearchedProductsId(state, action: PayloadAction<string[]>){
            state.searchedProductsId = action.payload;
        },
        setProducts(state, action: PayloadAction<IProduct[]>){
            state.products = action.payload;
        },
        setAllBrands(state, action: PayloadAction<string[]>){
            state.allBrands = action.payload;
        }
    }
})

export default productSlice.reducer