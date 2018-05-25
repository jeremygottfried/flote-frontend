import React, { Component} from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'
import Home from './Components/Home'
import RegistrationForm from './Components/RegistrationForm'
import NotesContainer from './Containers/NotesContainer'

class App extends Component {

  loggedIn = () => {
    return localStorage.getItem('token') !== null
  }

  logout = (event) => {

  }

  render() {
    return (
      <div className="App">
        <header>
        </header>
          <Switch>
            <Route path="/" exact render={(props) => (<Home></Home>)}></Route>
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
