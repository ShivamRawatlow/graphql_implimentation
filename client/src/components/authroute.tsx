import React, { useContext } from 'react';
import UserContext from '../context/user_context';
import { Route, Redirect } from 'react-router-dom';
import routeNames from '../utils/routeNames';



const AuthRoute = ({ component: Component, ...rest }: any) => {

  const context = useContext(UserContext);



  return (
    <Route
      {...rest}
      render={(props) =>
        context?.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={routeNames.login} />
        )
      }
    />
  );
};

export default AuthRoute;
