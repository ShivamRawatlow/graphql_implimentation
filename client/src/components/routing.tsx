import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Register from '../pages/register';
import UserProfile from '../pages/user_profile';
import routeNames from '../utils/routeNames';
import AuthRoute from './authroute';
import CreatePost from './create_post';
import MyProfileRoute from './myprofileroute';

const Routing = () => {
  return (
    <Switch>
      <Route exact path={routeNames.login} component={Login} />
      <Route exact path={routeNames.register} component={Register} />
      <AuthRoute exact path={routeNames.home} component={Home} />
      <AuthRoute exact path={routeNames.createPost} component={CreatePost} />
      <AuthRoute exact path={routeNames.myprofile} component={Profile} />
      <MyProfileRoute path={routeNames.userprofile} component={UserProfile} />
    </Switch>
  );
};

export default Routing;
