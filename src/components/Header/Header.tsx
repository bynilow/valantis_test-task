import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProductsIdWithFiltersAC, setSearchedProductsIdFromStoreAC } from '../../store/reducers/ActionCreator';
import Container from '../Container/Container';
import Dropdown from './Dropdown/Dropdown';
import Input from './Inputs/Input';
import ButtonSearch from './Buttons/ButtonSearch';

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = ({ }) => {

    const { pageNumber, allBrands, isLoading } = useAppSelector(state => state.productReducer)

    const dispatch = useAppDispatch();

    const [nameValue, setNameValue] = useState('');

    const [brandValue, setBrandValue] = useState('All');

    const [priceValue, setPriceValue] = useState('');

    
    const onChangeBrand = (brand: string) => {
        setBrandValue(brand);
    }

    const onClickSearch = () => {
        if (nameValue.trim() || brandValue !== 'All' || priceValue.trim()) {
            dispatch(fetchProductsIdWithFiltersAC(
                priceValue, brandValue, nameValue
            ));
        }
        else if(!isLoading){
            dispatch(setSearchedProductsIdFromStoreAC())
        }
    }

    return (
        <HeaderBlock>
            <Container>

                <HeaderInner>
                    <Logo>
                        VALANTIS
                    </Logo>
                    <SearchBlock>
                        <Input
                            placeholder='Название'
                            onChange={(e: string) => setNameValue(e)}
                            type='text' />

                        <Dropdown
                            onChangeOption={(brand: string) => onChangeBrand(brand)}
                            options={allBrands} />

                        <Input
                            placeholder='Цена'
                            onChange={(e: string) => setPriceValue(e)}
                            type='number' />

                        <ButtonSearch
                            onClick={onClickSearch} />
                    </SearchBlock>
                </HeaderInner>
            </Container>
        </HeaderBlock>
    );
}

const Logo = styled.div`
    font-weight: 100;
    font-size: 2rem;
`

const SearchBlock = styled.div`
    display: flex;
    gap: 10px;
`

const HeaderInner = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
`

const HeaderBlock = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 4rem;
    background-color: white;
    box-shadow: 0 0 5px black;
    z-index: 10;
    display: flex;
    justify-content: center;
`

export default Header;