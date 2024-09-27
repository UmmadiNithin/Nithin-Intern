
import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background: linear-gradient(45deg, #ff9a9e, #fad0c4); 
  position: fixed;
  top: 80px; 
  left: 0;
  width: 220px; 
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

const SidebarItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.5px;

  &:hover {
    color: #ff6f61; 
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem href="#">Profile</SidebarItem>
      <SidebarItem href="#">Search</SidebarItem>
      <SidebarItem href="#">Settings</SidebarItem>
      <SidebarItem href="#">Logout</SidebarItem>
    </SidebarContainer>
  );
};
    
export default Sidebar;
