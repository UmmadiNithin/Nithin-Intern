


import React from 'react';
import ReactDOM from 'react-dom';
import JSXExample from './jsx';
import NoJSXExample from './nojsx';
import ClickCounter from './class';
import StudentList from './list';
function App() {
  return (
    <div>
      <h1>Hello, Welcome to the React Example</h1>
      <hr />
      <JSXExample />
      <NoJSXExample />
      <ClickCounter />
      <StudentList />
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));