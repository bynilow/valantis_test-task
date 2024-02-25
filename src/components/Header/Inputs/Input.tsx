import { FC, useState } from 'react';
import styled from 'styled-components'
import { palette } from '../../../styles/style';

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
            targetValue = targetValue === '0' 
                ? '' 
                : targetValue
        }
        setValue(targetValue);
        onChange(targetValue);
    }

    return (  
        <Block>
            <InputName
                type='text'
                placeholder={placeholder}
                maxLength={type === 'text' ? 30 : 11}
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
        </Block>
    );
}

const Currency = styled.div`
    color: ${palette.darkGray};
    line-height: 0;
    font-size: 1.5rem;
    margin-bottom: 3px;
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
    width: 100%;
    height: 100%;

    &:focus{
        border: none;
        outline: none;
    }
`

const Block = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    border: 2px solid ${palette.darkGray};
    border-radius: 10px;
    font-size: 1rem;
    padding: 0.5rem;
    height: 2.5rem;

    transition: 0.2s;

    @media (max-width: 480px) {
        min-width: 40%;
        flex: 1;
    }

    &:has(${InputName}:focus){
        border: 2px solid ${palette.accentColor}; 
    }

`

export default Input;