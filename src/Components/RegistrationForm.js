import React, {Component} from 'react'
import {Form, Checkbox, Button} from 'semantic-ui-react'
export default class RegistrationForm extends Component {

  state = {
    name: "",
    username: "",
    password: "",
    confirm: "",
    errors: "",
    accept: false,
    is_disabled: true,
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
        localStorage.setItem('token', json.token)
        localStorage.setItem('user_id', json.user_id)
        localStorage.setItem('username', json.username)
        this.props.refresh()
      } else{
        this.setState({errors: "Mistake"})
      }

    })
  }

  handleChange = (event) => {
    if (!event.target.name) {
      this.setAccept()
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      }, this.enabler)
    }
  }

  enabler = () => {
    if(
      this.state.username.length > 0
      && this.state.password.length > 0
      && this.state.name.length > 0
      && (this.state.password === this.state.confirm)
      && this.state.accept
    ){
      this.setState({
        is_disabled: false
      })
    } else {
        this.setState({is_disabled: true})
      }
  }

  setAccept = () => {
    this.setState({
      accept: !this.state.accept
    }, this.enabler)
  }

  render(){
    const errors = <p>{this.state.errors}</p>
    return (
      <div>
      {errors}
      <Form onSubmit={ this.handleSubmit }>
        <Form.Field>
          <label htmlFor="name">Name </label>
          <input placeholder='name' type="text"
            onChange={ this.handleChange }
            value={ this.state.name }
            name="name"
            id="name" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="username">Username </label>
          <input placeholder='username' type="text"
            onChange={ this.handleChange }
            value={ this.state.username }
            name="username"
            id="username" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password </label>
          <input
            placeholder='password'
            type="password"
            onChange={ this.handleChange }
            value={ this.state.password }
            name="password"
            id="password" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password"> Password Confirmation </label>
          <input
            placeholder='password confirmation'
            type="password"
            onChange={ this.handleChange }
            value={ this.state.confirm }
            name="confirm"
            id="confirm" />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label='I agree to the Terms and Conditions'
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button
          disabled={this.state.is_disabled}
          type="submit"> Submit
        </Button>
      </Form>
    </div>)
  }
}
