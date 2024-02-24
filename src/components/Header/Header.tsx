import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProductsIdWithBrandAC, fetchProductsIdWithNameAC } from '../../store/reducers/ActionCreator';
import Container from '../Container/Container';
import { useDebounce } from '../../hooks/react';
import Dropdown from './Dropdown/Dropdown';

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = ({}) => {

    const {pageNumber, allBrands} = useAppSelector(state => state.productReducer)

    const dispatch = useAppDispatch();

    const [nameValue, setNameValue] = useState('');
    const debouncedName = useDebounce(nameValue, 1500);

    const [brandValue, setBrandValue] = useState('All');
    const debouncedBrand = useDebounce(brandValue, 500);

    const [costValue, setCostValue] = useState('');
    const debouncedCost = useDebounce(costValue, 1500);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setNameValue(e.target.value);
    }
    const onChangeBrand = (brand: string) => {
        setBrandValue(brand);
    }
    const onChangeCost = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setCostValue(e.target.value);
    }

    const isFirstMountRef = useRef(true);
    useEffect(() => {
        if(isFirstMountRef.current){
            isFirstMountRef.current = false
        }
        else{
            dispatch(fetchProductsIdWithNameAC(debouncedName.toString(), pageNumber*50, 50));
        }
    }, [debouncedName])
    useEffect(() => {
        if(!isFirstMountRef.current){
            dispatch(fetchProductsIdWithBrandAC(debouncedBrand.toString(), pageNumber*50, 50));
        }
    }, [debouncedBrand])

    return (  
        <HeaderBlock>
            <Container>
                <HeaderInner>
                    <Label>
                        Название
                        <Input 
                            type='text' 
                            maxLength={30}
                            value={nameValue} 
                            onChange={(e) => onChangeName(e)} />
                    </Label>
                    <Dropdown 
                        onChangeOption={(brand:string) => onChangeBrand(brand)}
                        options={allBrands} />
                    <Label>
                        Цена
                        <Input
                            type="number"
                            maxLength={30}
                            value={costValue}
                            onChange={(e) => onChangeCost(e)} />
                    </Label>
                </HeaderInner>
            </Container>
        </HeaderBlock>
    );
}


const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
`

const Input = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1rem;
    padding: 0.5rem;

    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:hover{
        appearance: none;
        -moz-appearance: textfield;
    }

    &:focus{
        border: 1px solid black;
        outline: none;

        appearance: none;
        -moz-appearance: textfield;
    }
`

const HeaderInner = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    align-items: center;
    gap: 15px;
`

const HeaderBlock = styled.header`
    position: fixed;
    width: 100vw;
    height: 4rem;
    background-color: #c8c8c8;
    z-index: 10;
    display: flex;
    justify-content: center;
`

export default Header;