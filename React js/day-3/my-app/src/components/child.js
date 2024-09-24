import React from 'react';

const ChildComponent = ({ onClickFunction }) => {
  return (
    <div className="child-component">
      <h2>Child Component</h2>
      <button onClick={onClickFunction}>Click me</button>
    </div>
  );
};

export default ChildComponent;
