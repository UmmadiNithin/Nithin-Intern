import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  text-align: center;
  color: white;
  width: 100%;
`;

const MainContent = styled.main`
  padding: 20px;
  max-width: 800px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Footer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 10px;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const HomePage = () => {
  return (
    <Container>
      <Header>
        <h1>Welcome to My Styled React App</h1>
      </Header>

      <MainContent>
        <p>This is a simple page styled using styled-components in a React app.</p>
        <Button>Click Me</Button>
      </MainContent>

      <Footer>
        <p>&copy; 2024 My React App</p>
      </Footer>
    </Container>
  );
};

export default HomePage;
