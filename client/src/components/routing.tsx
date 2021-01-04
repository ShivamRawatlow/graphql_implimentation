import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import routeNames from '../utils/routeNames';

const Routing = () => {
  return (
    <Switch>
      <Route exact path={routeNames.home} component={Home} />
      <Route exact path={routeNames.login} component={Login} />
      <Route exact path={routeNames.register} component={Register} />
    </Switch>
  );
};

export default Routing;
