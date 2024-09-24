import React from 'react';
import ReactDOM from 'react-dom';
import ToggleComponent from './components/1-1';
import Counter from './components/1-2';
import './index.css';
import ParentComponent from './components/parent';
import ParentColorComponent from './components/parentcolor';
import ChildColorComponent from './components/childcolor';




function App() {
  return (
    <div>
      <h1> <center>Welcome to the React Example</center></h1>
      <hr />
      <ToggleComponent />
      <Counter />
      <ParentComponent/>
      <ParentColorComponent/>
      <ChildColorComponent/>
      
     
     
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));


