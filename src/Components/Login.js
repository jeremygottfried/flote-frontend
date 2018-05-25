import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';

export default class Login extends Component {

  state = {
    username: "",
    password: "",
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const auth = { username, password };
    this.login(auth)
  }

  login = ({username, password}) => {
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
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token),
      localStorage.setItem('user_id', json.user_id),
      localStorage.setItem('username', json.username)
      this.props.history.push(`/notes`)
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return (<div>
      <NavLink to="/">Home</NavLink>
      <h2>Login</h2>
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="username">Username: </label>
        <input type="text"
          onChange={ this.handleChange }
          value={ this.state.username }
          name="username"
          id="username" />
        <br/><br/>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          onChange={ this.handleChange }
          value={ this.state.password }
          name="password"
          id="password" />
          <br/><br/>
          <input type="submit" />
      </form>
    </div>)
  }

}
