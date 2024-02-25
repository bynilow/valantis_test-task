import { FC } from 'react';
import styled from 'styled-components'

interface IContainerProps {
    children: React.ReactNode;
}

const Container: FC<IContainerProps> = ({children}) => {

    return (  
        <ContainerBlock>
            {
                children
            }
        </ContainerBlock>
    );
}

const ContainerBlock = styled.div`
  width: 90%;
  height: 100%;
`

export default Container;