import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        string: 'This is the App!',
        message: ''
     };
  }

  componentDidMount() {
    window.addEventListener("message", receiveMessage.bind(this));
    // console.log('my frames:', window.frames)
    const context = this;
    function receiveMessage(event) {
      console.log(event)
      if (event.origin === "http://127.0.0.1:3050") {
        context.setState({[event.origin] : JSON.parse(event.data)})
        return;
      }
    }
  }

  settingState(key, value) {
    this.setState({[key] : value})
  }

  render() {
    const styleProDesc = {
      border: 'none',
      width: '1200px',
      height: '300px'
    }

    return (
      <div>
        <p>{ this.state.string }</p>
        <p>These are my props: { JSON.stringify(this.props) }</p>
        <p>Message from my child iframe: { this.state.message }</p>
        <iframe style={ styleProDesc } src="http://127.0.0.1:3050/"></iframe>
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);