import React, { Component} from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'
import Home from './Components/Home'
import RegistrationForm from './Components/RegistrationForm'
import NotesContainer from './Containers/NotesContainer'
import {Menu} from 'semantic-ui-react'

class App extends Component {
  loggedIn = () => {
    return localStorage.getItem('token') !== null
  }
  refresh = () => {
    this.forceUpdate()
  }
  logout = (event) => {
    localStorage.clear()
    this.forceUpdate()
  }

  render() {
    console.log(this)
    return (
      <div className="App">
        <header>
          <Menu secondary>
            <Menu.Item onClick={this.handleItemClick}>
              {this.loggedIn() ? <NavLink to="/notes"><h1>Flote</h1></NavLink> : <NavLink to="/"><h1>Flote</h1></NavLink> }
            </Menu.Item>
            <Menu.Menu position='right'>
              {this.loggedIn() ? <Menu.Item name='logout' onClick={this.logout} /> : null }
            </Menu.Menu>
          </Menu>
        </header>
          <Switch>
            {this.loggedIn() ? <Route path='/' render={(props) => (<NotesContainer logout={this.logout} {...props}></NotesContainer>)}></Route> : <Route path="/" exact render={(props) => (<Home refresh={this.refresh}></Home>)}></Route>}

            <Route path="/login" render={(props => (<Login {...props}></Login>) )}></Route>
            <Route path="/register" render={(props => (<RegistrationForm {...props}></RegistrationForm>) )}></Route>
            {this.loggedIn() ?
              <Route path='/notes' render={(props) => (<NotesContainer logout={this.logout} {...props}></NotesContainer>)}></Route>
                :
              <Redirect to="/"></Redirect>}
          </Switch>
      </div>
    );
  }
}

export default App;
