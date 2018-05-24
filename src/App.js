import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:4000/login', {
      method: 'POST',
      body:
        JSON.stringify({
          username: 'jeremy',
          password: 'password'
        })
      ,
      headers: {
        'Content-Type': "application/json",
        'accepts': 'application/json',
      }
    }).then(res => res.json()).then(console.log)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
