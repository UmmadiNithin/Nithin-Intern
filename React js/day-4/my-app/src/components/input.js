import React, { useState } from 'react';
import Validation from './Validation'; 
import CharComponent from './CharComponent'; 

function Input() {
  const [inputText, setInputText] = useState('');

  const inputChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  const deleteCharHandler = (index) => {
    const textArray = inputText.split('');
    textArray.splice(index, 1);
    setInputText(textArray.join(''));
  };

  const charList = inputText.split('').map((ch, index) => (
    <CharComponent 
      key={index} 
      char={ch} 
      clicked={() => deleteCharHandler(index)} 
    />
  ));

  return (
    <div className="App">
      <input 
        type="text" 
        value={inputText} 
        onChange={inputChangeHandler} 
      />
      <p>Text Length: {inputText.length}</p>
      <Validation textLength={inputText.length} />
      {charList}
    </div>
  );
}

export default Input;
