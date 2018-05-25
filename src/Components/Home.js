import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';


export default class Home extends Component {
  render(){
    return(
      <div>
        <h1>Welcome to Flote</h1>
        <NavLink to="/login">Login</NavLink>
        <br></br>
        <NavLink to="/register">Register</NavLink>
      </div>
    )
  }
}
