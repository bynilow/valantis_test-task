import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPageAC } from '../../store/reducers/ActionCreator';

interface IPaginationButtonsProps {

}

function PaginationButtons({}: IPaginationButtonsProps) {

    const {pageNumber, isLoading, allProductsId, searchedProductsId} = useAppSelector(state => state.productReducer)

    const maxPages = Math.ceil(searchedProductsId.length / 50);

    const dispatch = useAppDispatch();

    const onClickPrevPage = () => {
        if(pageNumber !== 0 && !isLoading){
            dispatch(setPageAC(pageNumber - 1))
        }
    }

    const onClickNextPage = () => {
        if(pageNumber !== maxPages && !isLoading){
            dispatch(setPageAC(pageNumber + 1))
        }
    }

    const onClickNumberPage = (page: number ) => {
        if(!isLoading){
            dispatch(setPageAC(page));
        }
    }

    return (
        <Pagination>
            <p>Найдено товаров: {searchedProductsId.length}</p>
            <p>Страниц: {maxPages}</p>
            <ButtonsGroup>

                <Button
                    onClick={() => onClickPrevPage()}
                    disabled={pageNumber === 0 || isLoading}>
                    ❮
                </Button>

                {

                    Array.from(new Set([1, pageNumber - 1]))
                        .filter(i => i > 0 && i !== pageNumber+1).map(i =>
                            <Button 
                                key={i} 
                                onClick={() => onClickNumberPage(i-1)}
                                disabled={isLoading} >
                                {i}
                            </Button>)
                }
                
                <ActivePageButton disabled={isLoading}>
                    {pageNumber + 1}
                </ActivePageButton>

                {
                    Array.from(new Set([pageNumber+3, maxPages]))
                        .filter(i => i <= maxPages && i !== pageNumber+1).map(i => 
                            <Button 
                                key={i} 
                                onClick={() => onClickNumberPage(i-1)}
                                disabled={isLoading}>
                                {i}
                            </Button>)
                }

                <Button
                    onClick={() => onClickNextPage()}
                    disabled={pageNumber+1 >= maxPages || isLoading}>
                    ❯
                </Button>

            </ButtonsGroup>

        </Pagination>
    );
}



const ButtonsGroup = styled.div`
    display: flex;
    gap: 10px;
    
`

const Button = styled.button`
    position: relative;
    background: white;
    font-size: 1.2rem;
    line-height: 0;
    text-align: center;
    width: 3rem;
    height: 3rem;
    border: none;
    cursor: pointer;
    user-select: none;

    &:after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 0;
        background-color: #257ae8;
        width: 0%;
        height: 2px;
        transition: 0.1s;
    }

    transition: 0.1s;
    &:hover{
        &:after{
            width: 100%;
        }
    }
`

const ActivePageButton = styled(Button)`
    cursor: default;
    &:after{
        width: 100%;
    }
`

const Pagination = styled.div`
    display: flex;
    flex-direction: column;
    
`

export default PaginationButtons;