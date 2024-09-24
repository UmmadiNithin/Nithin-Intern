import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
  margin: 20px auto;
  padding: 16px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const CardDescription = styled.p`
  margin-top: 12px;
  font-size: 16px;
  color: #333;
`;

const ImageCard = ({ imageSrc, description }) => {
  return (
    <CardContainer>
      <CardImage src={imageSrc} alt="card-img" />
      <CardDescription>{description}</CardDescription>
    </CardContainer>
  );
};

export default ImageCard;
