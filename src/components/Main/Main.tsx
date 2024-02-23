import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProductCard from '../Cards/ProductCard';
import PaginationButtons from '../Pagination/PaginationButtons';
import { fetchAllBrandsAC, fetchAllProductsIdAC, fetchProductsAC, setPageAC } from '../../store/reducers/ActionCreator';
import Loading from '../Loading/Loading';

interface IMainProps {

}

const Main: FC<IMainProps> = ({ }) => {
    const dispatch = useAppDispatch();
    const { allProductsId, searchedProductsId, products, isLoading, pageNumber, error } = useAppSelector(state => state.productReducer);

    const isFirstMountRef = useRef(true);
    useEffect(() => {
        if (isFirstMountRef.current) {
            isFirstMountRef.current = false
        }
        else {
            dispatch(fetchProductsAC(searchedProductsId.slice(pageNumber * 50, pageNumber * 50 + 50)));
        }

    }, [pageNumber]);

    useEffect(() => {
        dispatch(fetchAllProductsIdAC());
        dispatch(fetchAllBrandsAC());
    }, [])

    return (
        <MainBlock>
            <PaginationButtons />

            {
                error && <h1>Ошибка: {error}</h1>
            }
            {
                isLoading
                    ? <Loading />
                    : <>
                        <List>
                            {
                                products.length
                                    ? products.map(product => <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        brand={product.brand}
                                        price={product.price}
                                        product={product.product} />)
                                    : null
                            }
                        </List>
                        <PaginationButtons />
                    </>
            }


        </MainBlock>
    );
}


const List = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    border: 1px solid black;
    border-radius: 10px;
    height: fit-content;
    width: 100%;
    padding: 1rem;
`

const MainBlock = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    margin-top: 5rem;
`

export default Main;