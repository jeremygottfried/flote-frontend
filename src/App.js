import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    username: '',
    password: ''
  }

  componentDidMount() {

  }

doFetch = ({username, password}) => {
  fetch('http://localhost:4000/login', {
    method: 'POST',
    body:
      JSON.stringify({
        username: username,
        password: password
      })
    ,
    headers: {
      'Content-Type': "application/json",
      'accepts': 'application/json',
    }
  }).then(res => res.json()).then(console.log)
}

  handleSubmit = (event) => {
  event.preventDefault();
  const { username, password } = this.state;
  const auth = { username, password };
  this.doFetch(auth)
}

// insert fetch here

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
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

          <div>
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="username">Username</label>
              <input type="text"
                onChange={ this.handleChange }
                value={ this.state.username }
                name="username"
                id="username" />
              <label htmlFor="password">
                Password
              </label>
              <input
                type="password"
                onChange={ this.handleChange }
                value={ this.state.password }
                name="password"
                id="password" />
              <input type="submit" />
            </form>
          </div>
      </div>
    );
  }
}

export default App;
