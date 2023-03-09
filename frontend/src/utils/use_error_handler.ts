import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user_context';
import { errorMessages } from './errors';
import routeNames from './routeNames';

export const useErrorHandler = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();

  const checkError = (err: any) => {
    const message = err?.response?.errors[0]?.message;

    if (
      message === errorMessages.INVALID_TOKEN ||
      message === errorMessages.NO_TOKEN
    ) {
      context?.setAlert({
        message: 'not authorized to perform that action',
        severity: 'error',
      });
      navigate(routeNames.login);
    }

    context?.setAlert({
      message,
      severity: 'error',
    });
  };
  return { checkError };
};
