import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginCallback from './pages/LoginCallback';
import api from '../api';
import CreatePlaylist from './pages/CreatePlaylist';
import SuccessLogin from './pages/SuccessLogin';
import EditPlaylist from './pages/EditPlaylist';
import YourPlaylists from './pages/YourPlaylists';

class App extends Component {
  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header d-flex justify-content-between p-0">
        <div className="logo-wrapper">
          <h1 className="App-title m-0">LISTR.</h1>
          <p className="m-0 logo-p">Join the party or create your own</p>
          </div>
          <div className="nav-wrapper align-self-center mr-2">
          {api.isLoggedIn() && <NavLink exact to="/" >Create a playlist</NavLink>}
          {api.isLoggedIn() && <NavLink exact to="/your-playlists">Your Playlists</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          </div>
        </header>
        <Switch>
          <Route path="/" exact component={CreatePlaylist} />
          <Route path='/playlist/:playlistId' component={EditPlaylist} />
          <Route path="/login" component={Login} />
          <Route path='/login/callback' component={LoginCallback} />}
          <Route path='/success-login' component={SuccessLogin} />}
          <Route path='/your-playlists' component={YourPlaylists} />}

    <Route render={() => <div className="error"><br /><h2>404</h2><br /><img src="https://media.giphy.com/media/6Q2KA5ly49368/giphy.gif" alt="404" /></div>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
