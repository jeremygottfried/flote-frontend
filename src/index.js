import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './Constants';

ReactDOM.render(
<ActionCableProvider url={API_WS_ROOT}>
  <Router>
  <App />
  </Router>
  </ActionCableProvider>, document.getElementById('root'));
registerServiceWorker();
