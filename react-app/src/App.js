import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import Home from './components/home';
import UserList from './components/userList';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
            <ul style={{listStyle: 'none', background: '#057bfe'}}>
              <li style={{display: 'inline-block', float: 'left'}}>
                <Link to="/" style={{color: '#fff'}}>Login</Link>
              </li>
              <li style={{display: 'inline-block', marginRight: '100px'}}>
                <Link to="/signup" style={{color: '#fff'}}>Signup</Link>
              </li>
			  <li style={{display: 'inline-block', paddingRight: '50px', float: 'right'}}>
                <Link to="/users" style={{color: '#fff'}}>Users</Link>
              </li>
            </ul>
        </nav>

        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>
		  <Route path="/users">
            <UserList />
          </Route>
		  <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
