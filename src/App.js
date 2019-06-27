import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = function () {
    console.log('handle click!');
   // ipcRenderer.send("AUTO_DOWNLOAD", 'ping');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to ReD</h1>
          <button onClick={this.handleClick}>Badge</button>
        </header>
      </div>
    );
  }
}

export default App;
