interface Ierrors {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const validateRegisterInput = (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: Ierrors = {};
  if (userName.trim() === '') {
    errors.userName = 'UserName must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!email.match(regex)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Password does not match confirm password';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = (email: string, password: string) => {
  const errors: Ierrors = {};
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!email.match(regex)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateRegisterInput, validateLoginInput };
