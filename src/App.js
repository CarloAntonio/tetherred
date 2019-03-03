import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import EventDetails from './components/projects/EventDetails';

import PrimaryAppBar from './containers/PrimaryAppBar';
import SignInForm from './containers/SignInForm';
import SignUpForm from './containers/SignUpForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <PrimaryAppBar/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/event/:id' component={EventDetails} />
            <Route path='/signin' component={SignInForm} />
            <Route path='/signup' component={SignUpForm} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
