import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background: linear-gradient(45deg, #ff6f61, #d83a6f); 
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  height: 80px; 
  z-index: 1000; 
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 2rem; 
  margin: 0;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 20px; 
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center; 
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.5px;

  &:hover {
    color: #ffeb3b; 
  }
 
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px; 
  background: #fff; 
  padding: 5px 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
`;

const SearchInput = styled.input`
  border: none;
  padding: 8px;
  font-size: 1rem;
  outline: none;
  border-radius: 20px; 
  width: 300px; 
`;

const SearchButton = styled.button`
  border: none;
  background: #ff6f61; 
  color: #fff;
  padding: 8px 12px;
  border-radius: 20px; 
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #d83a6f; 
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>N CART</Logo>
      <Nav>
        <NavItem href="#">Home</NavItem>
        <NavItem href="#">About</NavItem>
        <NavItem href="#">contact</NavItem>

        
      </Nav>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>Search</SearchButton>
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;
