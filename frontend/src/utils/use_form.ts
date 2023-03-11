import { useContext, useState } from 'react';
import UserContext from '../context/user_context';
import { errorInterface } from '../pages/registration/register';
import { errorMessages } from './errors';

interface valuesType {
  email?: string;
  password?: string;
  userName?: string;
  confirmPassword?: string;
}

const useForm = (
  callback: any,
  initialState: valuesType = {},
  setErrors: React.Dispatch<React.SetStateAction<errorInterface>>
) => {
  const context = useContext(UserContext);
  const [values, setValues] = useState(initialState);
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (values.userName === undefined) {
      if (!isLoginDataValid()) {
        return;
      }
    } else {
      if (!isRegisterDataValid()) {
        return;
      }
    }
    callback();
  };

  const isLoginDataValid = () => {
    if (!values.email) {
      setErrors({ email: true });
      setAlert(errorMessages.EMAIL_EMPTY);
      return false;
    }
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!values.email.match(regex)) {
      setErrors({ email: true });
      setAlert(errorMessages.EMAIL_INVALID);
      return false;
    }
    if (!values.password) {
      setErrors({ password: true });
      setAlert(errorMessages.PASSWORD_EMPTY);
      return false;
    }
    return true;
  };

  const isRegisterDataValid = () => {
    if (!values.userName) {
      setErrors({ userName: true });
      setAlert(errorMessages.USERNAME_EMPTY);
      return false;
    }
    if (!values.email) {
      setErrors({ email: true });
      setAlert(errorMessages.EMAIL_EMPTY);
      return false;
    }
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!values.email.match(regex)) {
      setErrors({ email: true });
      setAlert(errorMessages.EMAIL_INVALID);
      return false;
    }
    if (!values.password) {
      setErrors({ password: true });
      setAlert(errorMessages.PASSWORD_EMPTY);
      return false;
    }
    if (!values.confirmPassword || values.password !== values.confirmPassword) {
      setErrors({ password: true });
      setAlert(errorMessages.PASSWORD_CONFIRM_PASSWORD_NOT_MATCH);
      return false;
    }
    return true;
  };

  function setAlert(message: string) {
    context?.setAlert({
      message,
      severity: 'error',
    });
  }

  return {
    onChange,
    onSubmit,
    values,
  };
};

export default useForm;
