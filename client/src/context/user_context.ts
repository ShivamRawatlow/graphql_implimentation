import { createContext, useReducer } from 'react';
import IUser from '../interfaces/user_interface';
interface IUserContext {
  token?: string;
  user: IUser | null;
  login: (userData: any) => void;
  logout: () => void;
  updateUser: (userData: IUser) => void;

  setAlert: (
    value: React.SetStateAction<{
      message: string;
      severity: string;
    }>
  ) => void;
}

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

const UserContext = createContext<IUserContext | null>(null);

export default UserContext;
