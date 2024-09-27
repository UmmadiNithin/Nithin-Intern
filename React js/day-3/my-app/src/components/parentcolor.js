
import React, { useState } from 'react';
import ChildColorComponent from './childcolor';

const ParentColorComponent = () => {
 
  const [color, setColor] = useState('blue');

  
  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <div className="parent-component">
      <img 
        src="/images/react-logo.png" 
        alt="React Logo" 
        className="react-logo" 
      />
      <h1 style={{ color: color }}>Color: {color}</h1>
      <ChildColorComponent changeColor={changeColor} />
    </div>
  );
};

export default ParentColorComponent;
