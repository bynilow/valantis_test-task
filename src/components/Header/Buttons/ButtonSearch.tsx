import { FC } from 'react';
import styled from 'styled-components'
import { palette } from '../../../styles/style';

const searchIcon = require('../../../icons/search.png'); 

interface IButtonSearchProps {
    onClick: Function;
}

const ButtonSearch: FC<IButtonSearchProps> = ({onClick}) => {

    return (  
        <Button onClick={() => onClick()}>
            <Image src={searchIcon} alt='' />
        </Button>
    );
}

const Image = styled.img`
    height: 100%;
    aspect-ratio: 1/1;
    filter: contrast(0%);
`

const Button = styled.button`
    display: flex;
    align-items: center;
    background-color: white;
    border: 2px solid ${palette.darkGray};
    border-radius: 10px;
    font-size: 1rem;
    padding: 0.5rem;
    height: 2.5rem;
    cursor: pointer;
    transition: 0.1s;

    &:hover{
        color: ${palette.accentColor};
        border: 2px solid ${palette.accentColor};

        ${Image}{
            filter: invert(66%) sepia(95%) saturate(6006%) hue-rotate(202deg) brightness(96%) contrast(88%);
        }
    }

`

export default ButtonSearch;