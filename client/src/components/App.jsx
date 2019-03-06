import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginCallback from './pages/LoginCallback';
import api from '../api';
import ChoosePlaylist from './pages/ChoosePlaylist';
import SuccessLogin from './pages/SuccessLogin';
import EditPlaylist from './pages/EditPlaylist';


class App extends Component {
  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battlelist</h1>
          <NavLink exact to="/" >Create a playlist</NavLink>
          {api.isLoggedIn() && <NavLink exact to="/your-playlists">Your Playlists</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
        <Switch>
          <Route path="/" exact component={ChoosePlaylist} />
          <Route path='/playlist/:playlistId' component={EditPlaylist} />
          <Route path="/login" component={Login} />
          <Route path='/login/callback' component={LoginCallback} />}
          <Route path='/success-login' component={SuccessLogin} />}
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
