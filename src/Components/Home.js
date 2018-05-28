import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import {Menu} from 'semantic-ui-react'
import Login from './Login'
import RegistrationForm from './RegistrationForm'


export default class Home extends Component {
  state = { activeItem: 'login' }
  handleLoginClick = () => {
    this.setState({
      activeItem: 'login'
    })
  }
  handleRegisterClick = () => {
    this.setState({
      activeItem: 'register'
    })
  }
  render(){
    const {activeItem} = this.state
    return(
      <div>
        <div className='welcome'>
          <h1>Welcome to Flote</h1>

          <p>
            Lightweight and Accessible Anywhere <br/>
            A Note Taking App Designed With You in Mind
          </p>
        </div>
        <div className='login'>
          <Menu pointing secondary>
            <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleLoginClick}/>
            <Menu.Item name="register" active={activeItem === 'register'} onClick={this.handleRegisterClick}/>
          </Menu>
          {this.state.activeItem === 'login' ? <Login refresh={this.props.refresh}/> : <RegistrationForm />}

        </div>
      </div>
    )
  }
}
