import styled, { createGlobalStyle } from 'styled-components';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

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
  height: 100vh;
  display: flex;
  justify-content: center;

`

export default App;
