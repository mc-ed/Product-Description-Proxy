import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Proxy Script Loaded!')
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);