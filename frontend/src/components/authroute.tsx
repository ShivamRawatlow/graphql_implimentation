import { useContext } from 'react';
import UserContext from '../context/user_context';
import { Navigate } from 'react-router-dom';
import routeNames from '../utils/routeNames';

const AuthRoute = ({ children }: any) => {
  const context = useContext(UserContext);
  if (!context?.user) {
    return <Navigate to={routeNames.login} replace />;
  }
  return children
};

export default AuthRoute;
