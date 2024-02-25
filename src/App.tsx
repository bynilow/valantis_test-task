import styled, { createGlobalStyle } from 'styled-components';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Main from './components/Pages/Main';

function App() {

  return (
    <AppBlock>
      <GlobalStyle />
      <Header />
      <Container>
        <Main />
      </Container>
    </AppBlock>
  );
}

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`

const AppBlock = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    z-index: -1;
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    z-index: -1;
    display: hidden;
  }
  &::-webkit-scrollbar-thumb {
    z-index: -1;
    background-color: #b3b3b3; 
    border-radius: 3px;
  }
  
`

export default App;
