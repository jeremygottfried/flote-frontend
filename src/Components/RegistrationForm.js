import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';

export default class RegistrationForm extends Component {

  state = {
    name: "",
    username: "",
    password: "",
    errors: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, username, password } = this.state;
    const auth = { name, username, password };
    this.register(auth)
  }

  register = ({name, username, password}) => {
    fetch('http://localhost:4000/register', {
      method: 'POST',
      body:
        JSON.stringify({ name, username, password})
      ,
      headers: {
        'Content-Type': "application/json",
        'accepts': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.token){
        console.log(json);
        localStorage.setItem('token', json.token),
        localStorage.setItem('user_id', json.user_id),
        localStorage.setItem('username', json.username)
        this.props.history.push(`/notes`)
      } else{
        this.setState({errors: "Mistake"})
      }

    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const errors = <p>{this.state.errors}</p>
    return (<div>
      <NavLink to="/">Home</NavLink>
      {errors}
      <h2>Registration Form</h2>
      <form onSubmit={ this.handleSubmit }>
      <label htmlFor="name">Name: </label>
      <input type="text"
        onChange={ this.handleChange }
        value={ this.state.name }
        name="name"
        id="name" />
        <br/><br/>
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
