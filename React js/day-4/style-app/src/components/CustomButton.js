import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? 'blue' : 'gray')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? 'darkblue' : 'darkgray')};
  }

  &:active {
    background-color: ${(props) => (props.primary ? 'dodgerblue' : 'lightgray')};
  }
`;


const CustomButton = (props) => {
  return (
    <div><center>
      <StyledButton primary>Primary Button</StyledButton>
      <StyledButton>Secondary Button</StyledButton></center>
    </div>
  );
};

export default CustomButton;
