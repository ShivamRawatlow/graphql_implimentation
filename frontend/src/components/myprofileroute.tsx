import { useContext } from 'react';
import UserContext from '../context/user_context';
import {  Navigate, useParams } from 'react-router-dom';
import routeNames from '../utils/routeNames';

const MyProfileRoute = ({ children }: any) => {
  const context = useContext(UserContext);
  const params = useParams();
  if (context?.user?.email === params.email && params.email) {
    return <Navigate to={routeNames.myprofile} replace />;
  }
  return children;
};

export default MyProfileRoute;
