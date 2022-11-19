import React from 'react'

import {Switch, Route,Router, BrowserRouter, Link } from 'react-router-dom';

import Home from './Home'
import App from './App';
import Reg from './Reg';
import Login from './Login';
import Log from './Log';

const Rout = () => {
  return (
    <div>
<BrowserRouter>
<Switch>
    <Route path="/" exact component={Home} />
    <Route path='/log' exacet component={Log} />
    <Route path='/login' exacet component={Login} />
    <Route path="/reg" exact component={Reg} />
</Switch>
</BrowserRouter>
    </div>
  )
}

export default Rout

