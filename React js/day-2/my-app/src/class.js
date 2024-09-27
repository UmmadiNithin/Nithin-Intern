import React from 'react';




// Q5: Class Component with Button Click Counter
class ClickCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count1: 0, count2: 0 };
  
  
  
    }
  
    handleClick = () => {
      this.setState({ count1: this.state.count1 + 1 });
      this.setState({ count2: this.state.count2 - 1 });
    };
  
  
  
    render() {
      return (
        <div>
          <h3>Click Counter: {this.state.count1}</h3>
          <h3>Click Counter: {this.state.count2}</h3>
  
          <button onClick={this.handleClick}>Click Me!</button>
  
        </div>
      );
    }
  }

  export default ClickCounter;