import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchIdsWithFiltersAC, setSearchedProductsIdFromStoreAC } from '../../store/reducers/ActionCreator';
import Container from '../Container/Container';
import ButtonSearch from './Buttons/ButtonSearch';
import Dropdown from './Dropdown/Dropdown';
import Input from './Inputs/Input';

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = ({ }) => {

    const { allBrands, isLoading } = useAppSelector(state => state.productReducer)

    const dispatch = useAppDispatch();

    const [nameValue, setNameValue] = useState('');

    const [brandValue, setBrandValue] = useState('All');

    const [priceValue, setPriceValue] = useState('');


    const onChangeBrand = (brand: string) => {
        setBrandValue(brand);
    }

    const onClickSearch = () => {
        if (nameValue.trim() || brandValue !== 'All' || priceValue.trim()) {
            dispatch(fetchIdsWithFiltersAC(
                priceValue, brandValue, nameValue
            ));
        }
        else if (!isLoading) {
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

    @media (max-width: 480px) {
        display: none;
    }
`

const SearchBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(8rem, 1fr)) auto;
    gap: 10px;
    width: 60%;

    @media (max-width: 979px) {
        width: 80%;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
    @media (max-width: 480px) {
        display: flex;
        flex-wrap: wrap;
        
    }
    
`

const HeaderInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;


    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
    }
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

    @media (max-width: 768px) {
        height: 8rem;
    }
    @media (max-width: 480px) {
        height: 7rem;
    }
`

export default Header;