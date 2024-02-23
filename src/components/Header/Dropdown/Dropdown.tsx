import { FC, useState } from 'react';
import styled from 'styled-components'

interface IDropdownProps {
    options: string[];
}

const Dropdown: FC<IDropdownProps> = ({options}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Все');

    const onSelect = (value: string) => {
        setSelectedValue(value);
        if(value !== 'Все') setIsOpen(false);
    }

    return (  
        <Block onMouseLeave={() => setIsOpen(false)}>
            <Button onMouseEnter={() => setIsOpen(true)} onClick={() => setIsOpen(true)}>
                {selectedValue}
            </Button>
            {
                isOpen &&
                <List>
                    <Option
                        isSelected={'Все' === selectedValue}
                        onClick={() => onSelect('Все')}>
                        Все
                    </Option>
                    {
                        options.map(option =>
                            <Option
                                key={option}
                                isSelected={option === selectedValue}
                                onClick={() => onSelect(option)}>
                                {option}
                            </Option>)
                    }
                </List>
            }
        </Block>
    );
}

interface IOptionProps{
    isSelected: boolean;
}

const Option = styled.div<IOptionProps>`
    cursor: pointer;
    white-space: nowrap;
    width: 15rem;
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    transition: 0.1s;

    ${
        p => p.isSelected && `border-left: 5px solid orange;`
    }
`

const List = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content; 
    height: 50vh;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    background-color: #cdcdcd;
    padding: 3px;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: #cdcdcd;
    }
    &::-webkit-scrollbar-thumb {
        background-color: gray; 
        border-radius: 20px;
    }
`

const Button = styled.button`
    width: 15rem;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1rem;
    text-align: left;
    padding: 0.5rem;
`

const Block = styled.div`
    position: relative;
    width: fit-content;
`

export default Dropdown;