import React from 'react';

const CharComponent = (props) => {
  return (
    <div className="CharComponent" onClick={props.clicked}>
      {props.char}
    </div>
  );
};

export default CharComponent;
