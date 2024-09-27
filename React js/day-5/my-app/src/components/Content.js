import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const ContentContainer = styled.div`
  margin-left: 220px; 
  padding: 40px 20px; 
  background-color: #fff;
  height: calc(100vh - 80px); 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


const PromoText = styled.div`
  color: #ff6f61; 
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OfferText = styled.div`
  color: #00c6ff; 
  font-size: 2rem;
`;

const ClockContainer = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
  color: #333;
  margin-top: 20px;
  background-color: #f5f5f5;
  border: 2px solid #ddd; 
  border-radius: 10px; 
  padding: 10px 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  display: inline-block;
`;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ClockContainer>
      {formatTime(time)}
    </ClockContainer>
  );
};


const Content = () => {
  return (
    <ContentContainer>
      <div>
        <PromoText>Big Fashion Festival is Coming Soon!</PromoText>
        <OfferText>30-50% OFF</OfferText>
        <PromoText>Current Time</PromoText>

        <Clock />
      </div>
    </ContentContainer>
  );
};

export default Content;
