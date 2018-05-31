import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'

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
        localStorage.setItem('token', json.token)
        localStorage.setItem('user_id', json.user_id)
        localStorage.setItem('username', json.username)
        this.props.refresh()
      } else {
      this.setState({errors: "Invalid username or password."})
      }
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      if(
        this.state.username.length > 0
        && this.state.password.length > 0
      ) {
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
    const errors = <h2>{this.state.errors}</h2>
    return (
      <Form onSubmit={ this.handleSubmit }>
        {errors}
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username'
            type="text"
            onChange={ this.handleChange }
            value={ this.state.username }
            name="username"
            id="username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password'
            type="password"
            onChange={ this.handleChange }
            value={ this.state.password }
            name="password"
            id="password"/>
        </Form.Field>

        <Button disabled={this.state.is_disabled} type='submit'>Submit</Button>
      </Form>
    )
  }

}
