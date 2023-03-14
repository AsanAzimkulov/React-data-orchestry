import './App.css';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './pages/Home';
import Linking from './pages/Linking';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className='App'>
        <Switch>
          <Route path='/linking'>
            <Linking />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
