import { FC } from 'react';
import styled, { keyframes } from 'styled-components'
import { palette } from '../../styles/style';

interface ILoaderProps {

}

const Loader: FC<ILoaderProps> = ({}) => {

    return (  
        <Block>
            
        </Block>
    );
}

const Anim = keyframes`
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.7) rotate(-370deg);
        border-radius: 0%;
    }
    100%{
        transform: scale(1);
    }
`

const Block = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    background-color: ${palette.accentColor};

    animation: ${Anim} 3s ease infinite;
`

export default Loader;