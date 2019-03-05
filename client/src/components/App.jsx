import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginCallback from './pages/LoginCallback';
import api from '../api';
// import Profile from './pages/Profile';
import EditPlaylist from './pages/EditPlaylist';
import ChoosePlaylist from './pages/ChoosePlaylist';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battlelist</h1>
          <NavLink exact to="/" >Choose your playlist</NavLink>
          {api.isLoggedIn() && <NavLink exact to="/profile" >Profile</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
        <Switch>
          <Route path="/" exact component={ChoosePlaylist} />
          <Route path='/editplaylist' component={EditPlaylist} />
          <Route path="/login" component={Login} />
          <Route path='/login/callback' component={LoginCallback} />}
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
