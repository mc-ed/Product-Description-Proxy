import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeID = this.changeID.bind(this);
    this.broadcastID = this.broadcastID.bind(this);
    this.state = {
      id: null
     };
  }

  changeID(e) {
    this.setState({id: e.target.value})
  }

  broadcastID() {
    window.dispatchEvent(new CustomEvent('product',{detail: {product_id: this.state.id}}))
  }


  render() {
    return (
      <div>
        <input onChange={(e) =>{this.changeID(e)}} type="text" name="" id="IDinput"/>
        <button onClick={() =>{this.broadcastID()}}>Submit</button>
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);