import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default class Login extends Component {

  state = {
    username: "",
    password: "",
    errors: "",
    is_disabled: true,
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
        JSON.stringify({username, password})
      ,
      headers: {
        'Content-Type': "application/json",
        'accepts': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.token){
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
      [event.target.name]: event.target.value,
    }, () => {
      if(this.state.username.length > 0 && this.state.password.length > 0){
        this.setState({
          is_disabled: false
        })
      }
        else{
          this.setState({is_disabled: true})
        }
    })
  }

  render(){
    const errors = <p>{this.state.errors}</p>
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Field>
          <label>Username</label>
          <input placeholder='username'
            type="text"
            onChange={ this.handleChange }
            value={ this.state.username }
            name="username"
            id="username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='password'
            type="password"
            onChange={ this.handleChange }
            value={ this.state.password }
            name="password"
            id="password"/>
        </Form.Field>

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }

}
