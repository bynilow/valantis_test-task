import styled from 'styled-components'

interface IContainerProps {
    children?: React.ReactNode;
}

function Container({children}: IContainerProps) {

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