import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const FooterContainer = styled.div`
  background: linear-gradient(45deg, #ff6f61, #d83a6f); 
  text-align: center;
  padding: 15px; 
  position: fixed;
  bottom: 0;
  color: #fff;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2); 
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  flex-wrap: wrap; 
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-right: 15px; 
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 1.5rem; 
  text-decoration: none;

  &:hover {
    color: #ffeb3b; 
  }
`;

const FooterNav = styled.div`
  display: flex;
  gap: 20px;
  font-size: 0.9rem; 
  margin-right: auto;
`;

const FooterNavItem = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ffeb3b;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterNav>
          <FooterNavItem href="#">About Us</FooterNavItem>
          <FooterNavItem href="#">Contact</FooterNavItem>
          <FooterNavItem href="mailto:Nithinmoonu@gmail.com">Mail Us</FooterNavItem>
        </FooterNav>
        <SocialLinks>
          <SocialLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </SocialLink>
          <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i> 
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
