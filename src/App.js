import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import EventDetails from './components/projects/EventDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateEvent from './components/projects/CreateEvent';

import AppBar from './containers/AppBar';
import SignInForm from './containers/SignInForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/event/:id' component={EventDetails} />
            <Route path='/signin' component={SignInForm} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateEvent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
