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
            <p>Товаров: {searchedProductsId.length}</p>
            <p>Страниц: {maxPages}</p>
            <p>Текущая страница: {pageNumber + 1}</p>
            <ButtonsGroup>
                <DirectionButton 
                    disabled={pageNumber === 0 || isLoading} 
                    onClick={() => onClickPrevPage()}>
                    left
                </DirectionButton>

                {
                    
                    Array.from(new Set([1, pageNumber-1, pageNumber]))
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
                    Array.from(new Set([pageNumber+2, pageNumber+3, pageNumber+4]))
                        .filter(i => i <= maxPages && i !== pageNumber+1).map(i => 
                            <Button 
                                key={i} 
                                onClick={() => onClickNumberPage(i-1)}
                                disabled={isLoading}>
                                {i}
                            </Button>)
                }

                <DirectionButton 
                    disabled={pageNumber+1 >= maxPages || isLoading} 
                    onClick={() => onClickNextPage()}>
                    right
                </DirectionButton>
            </ButtonsGroup>

        </Pagination>
    );
}



const ButtonsGroup = styled.div`
    display: flex;
    gap: 10px;
    
`

const Button = styled.button`
  background: white;
  font-size: 1.2rem;
  line-height: 0;
  text-align: center;
  width: 3rem;
  height: 3rem;
  /* padding: 1rem; */
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  transition: 0.1s;
  &:hover{
    transform: scale(1.1);
  }
`

const ActivePageButton = styled(Button)`
    border: 2px orange solid;
    cursor: default;
    &:hover{
        transform: none;
    }
`

const DirectionButton = styled(Button)`
    background-color: orange;
    width: 6rem;

    &:disabled{
        background-color: gray;

        &:hover{
            transform: none;
            cursor: default;
        }
    }

`

const Pagination = styled.div`
    display: flex;
    flex-direction: column;
    
`

export default PaginationButtons;