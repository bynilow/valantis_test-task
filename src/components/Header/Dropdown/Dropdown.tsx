import { FC, useState } from 'react';
import styled from 'styled-components'
import { palette } from '../../../styles/style';

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
                        $isSelected={'All' === selectedValue}
                        onClick={() => onSelect('All')}>
                        Все
                    </Option>
                    {
                        options.map(option =>
                            <Option
                                key={option}
                                $isSelected={option === selectedValue}
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
    color: ${palette.darkGray};
`

interface IOptionProps{
    $isSelected: boolean;
}

const Option = styled.div<IOptionProps>`
    cursor: pointer;
    white-space: nowrap;
    width: 15rem;
    padding: 5px;
    transition: 0.1s;

    &:hover{
        background-color: ${p => p.$isSelected ? `#cbcbcb` : `#f2f2f2`}
    }

    background-color: ${
        p => p.$isSelected ? `#cbcbcb` : `none`
    };

    
`

const List = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content; 
    height: 50vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    background-color: white;
    box-shadow: 0 0 5px #0000005b;
    padding: 3px;
    overflow-x: hidden;
    overflow-y: scroll;
    clip-path: circle(0% at 50% 0);

    transition: 0.3s;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: ${palette.lightGray};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${palette.darkGray}; 
        border-radius: 20px;
    }
`

const Button = styled.button`
    width: 15rem;
    background-color: white;
    border: 2px solid ${palette.darkGray};
    border-radius: 10px;
    font-size: 1rem;
    text-align: left;
    padding: 0.5rem;
    height: 2.5rem;
    
`

const Block = styled.div`
    position: relative;
    width: fit-content;
    transition: 0.3s;
    height: 2.5rem;
    &:hover ${List}{
        clip-path: circle(130% at 50% 0);
    }
`

export default Dropdown;