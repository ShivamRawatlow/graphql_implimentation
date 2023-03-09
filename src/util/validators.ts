import { errorMessages } from './errors';

const validateRegisterInput = (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (userName.trim() === '') {
    return {
      error: errorMessages.USERNAME_EMPTY,
      valid: false,
    };
  }
  if (email.trim() === '') {
    return {
      error: errorMessages.EMAIL_EMPTY,
      valid: false,
    };
  } else {
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!email.match(regex)) {
      return {
        error: errorMessages.EMAIL_INVALID,
        valid: false,
      };
    }
  }
  if (password === '') {
    return {
      error: errorMessages.PASSWORD_EMPTY,
      valid: false,
    };
  } else {
    if (password !== confirmPassword) {
      return {
        error: errorMessages.PASSWORD_CONFIRM_PASSWORD_NOT_MATCH,
        valid: false,
      };
    }
  }

  return {
    error: '',
    valid: true,
  };
};

const validateLoginInput = (email: string, password: string) => {
  if (email.trim() === '') {
    return {
      error: errorMessages.EMAIL_EMPTY,
      valid: false,
    };
  } else {
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!email.match(regex)) {
      return {
        error: errorMessages.EMAIL_INVALID,
        valid: false,
      };
    }
  }
  if (password === '') {
    return {
      error: errorMessages.PASSWORD_EMPTY,
      valid: false,
    };
  }
  return {
    error: '',
    valid: true,
  };
};

export { validateRegisterInput, validateLoginInput };
