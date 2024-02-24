import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProductsIdWithFiltersAC } from '../../store/reducers/ActionCreator';
import Container from '../Container/Container';
import Dropdown from './Dropdown/Dropdown';
import Input from './Inputs/Input';

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = ({ }) => {

    const { pageNumber, allBrands, isLoading } = useAppSelector(state => state.productReducer)

    const dispatch = useAppDispatch();

    const [nameValue, setNameValue] = useState('');
    const debouncedName = useDebounce(nameValue, 1500);

    const [brandValue, setBrandValue] = useState('All');
    const debouncedBrand = useDebounce(brandValue, 500);

    const [priceValue, setPriceValue] = useState('');
    const debouncedCost = useDebounce(priceValue, 1500);

    
    const onChangeBrand = (brand: string) => {
        setBrandValue(brand);
    }
    const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceValue(e.target.value);
    }

    const isFirstMountRef = useRef(true);
    useEffect(() => {
        if (isFirstMountRef.current) {
            isFirstMountRef.current = false
        }
        else if (!isLoading) {

            // dispatch(fetchProductsIdWithNameAC(debouncedName.toString(), pageNumber*50, 50));
        }
    }, [debouncedName, debouncedBrand, debouncedCost])

    // const onNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         if (nameValue.trim() || brandValue.trim() || priceValue.trim()) {
    //             dispatch(fetchProductsIdWithFiltersAC(
    //                 priceValue, brandValue, nameValue
    //             ));
    //         }
    //         // dispatch(fetchProductsIdWithFiltersAC(nameValue.toString(), pageNumber*50, 50));
    //     }
    // }

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