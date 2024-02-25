import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllBrandsAC, fetchAllIdsAC, fetchProductsAC } from '../../store/reducers/ActionCreator';
import ProductCard from '../Cards/ProductCard';
import Loading from '../Loader/Loader';
import PaginationButtons from '../Pagination/PaginationButtons';
import { palette } from '../../styles/style';
import Container from '../Container/Container';
import { getNounText } from '../../functions/getNounText';

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
        dispatch(fetchAllIdsAC());
        dispatch(fetchAllBrandsAC());
    }, [])

    return (
        <MainBlock>
            <Container>
                <ContainerInner>
                    <InfoPage>
                        <Title>
                            Ювелирные украшения
                        </Title>
                        {
                            searchedProductsId.length && !error
                                ? <CountProducts>
                                    {searchedProductsId.length.toLocaleString('ru')} {
                                        getNounText({
                                            number: searchedProductsId.length,
                                            one: 'товар',
                                            two: 'товара',
                                            five: 'товаров'
                                        })
                                    }
                                </CountProducts>
                                : null
                        }
                    </InfoPage>

                    {
                        error && <>
                            <Error>Произошла ошибка.</Error>
                            <ErrorMessage>{error}</ErrorMessage>
                        </>
                    }

                    {
                        !isLoading && !error && !searchedProductsId.length
                            ? <NotFound>
                                Ничего не найдено
                            </NotFound>
                            : null
                    }

                    {
                        searchedProductsId.length > 50 && !error
                            ? <PaginationOuter>
                                <PaginationButtons />
                            </PaginationOuter>
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
                        searchedProductsId.length > 50 && !error && !isLoading
                            ? <PaginationOuter>
                                <PaginationButtons />
                            </PaginationOuter>
                            : null
                    }
                </ContainerInner>
            </Container>
        </MainBlock>
    );
}

const InfoPage = styled.div`
    align-self: flex-start;
    @media (max-width: 768px) {
        align-self: center;
        text-align: center;
    }
`

const PaginationOuter = styled.div`
    width: 100%;

    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
    }
`

const ErrorMessage = styled.p`
    font-size: 1rem;
    color: red;
`

const Error = styled.p`
    font-size: 2rem;
    width: 100%;
`

const NotFound = styled.div`
    font-size: 2rem;
    width: 100%;

    @media (max-width: 768px) {
        text-align: center;
    }
`

const CountProducts = styled.p`
    font-size: 1rem;
    font-weight: lighter;
    color: ${palette.darkGray};
`

const Title = styled.h1`
    font-size: 3rem;

    @media (max-width: 768px) {
        font-size: 2rem;
        width: 100%;
        text-align: center;
    }
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 15px;
    border-radius: 10px;
    width: 100%;    
`

const ContainerInner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`

const MainBlock = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        margin-top: 9rem;
    }
    @media (max-width: 480px) {
        margin-top: 8rem;
    }
`

export default Main;