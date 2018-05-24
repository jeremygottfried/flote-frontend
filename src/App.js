import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect  } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
        </header>
        <Router>
          <Route path="/login" render={(props => (<Login></Login>) )}></Route>
        </Router>

      </div>
    );
  }
}

export default App;
