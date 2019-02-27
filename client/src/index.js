import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SpotifyApiContext } from 'react-spotify-api'
import api from './api';
// import registerServiceWorker from './registerServiceWorker';


const user = api.getProfile()
  .then(user => {
    console.log('TCL: user', user)
    return user
  })


ReactDOM.render(
  <Router>
    <SpotifyApiContext.Provider value={user.refreshToken}>
      <App />
    </SpotifyApiContext.Provider>
  </Router>, document.getElementById('root'));
// registerServiceWorker();
