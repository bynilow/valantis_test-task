import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllBrandsAC, fetchAllProductIdsAC, fetchProductsAC } from '../../store/reducers/ActionCreator';
import ProductCard from '../Cards/ProductCard';
import Loading from '../Loading/Loader';
import PaginationButtons from '../Pagination/PaginationButtons';
import { palette } from '../../styles/style';

interface IMainProps {

}

const Main: FC<IMainProps> = ({ }) => {
    const dispatch = useAppDispatch();
    const { searchedProductsId, products, isLoading, pageNumber, error } = useAppSelector(state => state.productReducer);

    const isFirstMountRef = useRef(true);
    useEffect(() => {
        if (isFirstMountRef.current) {
            isFirstMountRef.current = false
        }
        else if (!isLoading) {
            dispatch(fetchProductsAC(searchedProductsId.slice(pageNumber * 50, pageNumber * 50 + 50)));
        }

    }, [pageNumber]);

    useEffect(() => {
        dispatch(fetchAllProductIdsAC());
        dispatch(fetchAllBrandsAC());
    }, [])

    return (
        <MainBlock>
            <Title>
                Ювелирные украшения {
                    searchedProductsId.length
                        ? <CountProducts>{searchedProductsId.length.toLocaleString('ru')} товаров</CountProducts>
                        : null
                }
            </Title>

            {
                searchedProductsId.length && !isLoading 
                    ? <PaginationButtons /> 
                    : null
            }

            {
                error && <h1>Ошибка: {error}</h1>
            }

            {
                (!isLoading && !searchedProductsId.length)
                    ? <NotFound>
                        Ничего не найдено
                    </NotFound>
                    : null
            }

            {
                isLoading && !error
                    ? <Loading />
                    : <List>
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
            }

            {
                searchedProductsId.length && !isLoading 
                    ? <PaginationButtons /> 
                    : null
            }


        </MainBlock>
    );
}

const NotFound = styled.div`
    font-size: 2rem;
    width: 100%;
`

const CountProducts = styled.span`
    height: 100%;
    font-size: 0.7rem;
    font-weight: lighter;
    color: ${palette.darkGray};
`

const Title = styled.h1`
    font-size: 3rem;
    display: flex;
    gap: 10px;
    align-items: center;
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    border-radius: 10px;
    width: 100%;    
`

const MainBlock = styled.main`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    width: 100%;
    margin-top: 5rem;
`

export default Main;