import { FC, useState } from 'react';
import styled from 'styled-components'

interface IDropdownProps {
    options: string[];
    onChangeOption: Function;
}

const Dropdown: FC<IDropdownProps> = ({options, onChangeOption}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('All');

    const onSelect = (value: string) => {
        setSelectedValue(value);
        onChangeOption(value);
        if(value !== 'All') setIsOpen(false);
    }

    return (  
        <Block onMouseLeave={() => setIsOpen(false)}>
            <Arrow>
                ▼
            </Arrow>
            <Button onMouseEnter={() => setIsOpen(true)} onClick={() => setIsOpen(true)}>
                {
                    selectedValue === 'All' ? 'Все' : selectedValue
                }
            </Button>
            {
                true &&
                <List>
                    <Option
                        isSelected={'All' === selectedValue}
                        onClick={() => onSelect('All')}>
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

const Arrow = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

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
    clip-path: circle(0% at 50% 0);

    transition: 0.3s;

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
    transition: 0.3s;

    &:hover ${List}{
        clip-path: circle(130% at 50% 0);
    }
`

export default Dropdown;