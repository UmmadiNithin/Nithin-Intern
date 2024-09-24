import React from 'react';
import ChildComponent from './child';

const ParentComponent = () => {
  const handleButtonClick = () => {
    alert("Function from Parent Component triggered!");
  };

  return (
    <div className="parent-component">
      <h1>Parent Component</h1>
      <ChildComponent onClickFunction={handleButtonClick} />
    </div>
  );
};

export default ParentComponent;
