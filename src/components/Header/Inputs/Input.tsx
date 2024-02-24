import { FC, useState } from 'react';
import styled from 'styled-components'

const searchIcon = require('../../../icons/search.png'); 

interface IInputProps {
    onChange: Function;
    type: 'number' | 'text';
    placeholder: string;
}

const Input: FC<IInputProps> = ({onChange, type, placeholder}) => {
    const [value, setValue] = useState('');

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let targetValue = e.target.value;
        if(type === 'number'){
            targetValue = e.target.value.replace(/\D/g, '');
            targetValue = targetValue.trim() !== ''
                ? Number(targetValue).toLocaleString('ru')
                : targetValue
        }
        setValue(targetValue);
        onChange(targetValue);
    }

    return (  
        <Outer>
            <InputName
                type='text'
                placeholder={placeholder}
                maxLength={30}
                value={value}
                onChange={(e) => onChangeValue(e)} />
            {
                type === 'text'
                    ? <SearchImage src={searchIcon} alt='' />
                    : <Currency>
                        {
                            (0).toLocaleString('ru', {
                                style: 'currency',
                                currency: 'rub',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).replace(/\d/g, '').trim()
                        }
                    </Currency>
                    

            }
        </Outer>
    );
}

const Currency = styled.div`
    color: #b3b3b3;
    line-height: 0;
    font-size: 1.5rem;
`

const SearchImage = styled.img`
    height: 1rem;
    aspect-ratio: 1/1;
    filter: contrast(0%);
`

const InputName = styled.input`
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    height: 100%;

    &:focus{
        border: none;
        outline: none;
    }
`

const Outer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    border: 2px solid #b3b3b3;
    border-radius: 10px;
    font-size: 1rem;
    padding: 0.5rem;
    height: 2.5rem;

    transition: 0.2s;

    &:has(${InputName}:focus){
        border: 2px solid #257ae8; 
    }

`

export default Input;