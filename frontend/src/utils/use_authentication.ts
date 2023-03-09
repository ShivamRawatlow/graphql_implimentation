import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user_context';
import routeNames from './routeNames';

export const useAuthentication = () => {
  const token = localStorage.getItem('jwtToken');

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const checkAuthentication = (callback: any) => {
    if (!token || !context?.user) {
      context?.setAlert({
        message: 'not authorized to perform the action',
        severity: 'error',
      });
      navigate(routeNames.login);
      return;
    }
    callback();
  };

  return { checkAuthentication };
};
