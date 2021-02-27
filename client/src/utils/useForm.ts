import { useState } from 'react';

const useForm = (callback: any, initialState: any = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export default useForm;
