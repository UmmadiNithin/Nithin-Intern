
import React from 'react';

const ChildColorComponent = ({ changeColor }) => {
  if (typeof changeColor !== 'function') {
    console.error('changeColor is not a function');
    return null;
  }

  return (
    <div className="child-component">
      <button onClick={() => changeColor('red')}>Change Color to Red</button>
      <button onClick={() => changeColor('green')}>Change Color to Green</button>
      <button onClick={() => changeColor('blue')}>Change Color to Blue</button>
    </div>
  );
};

export default ChildColorComponent;
