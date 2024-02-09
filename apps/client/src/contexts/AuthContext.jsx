import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const signup = async ({ firstName, lastName, email, password }) => {
    const { data, status } = await axios.post(
      import.meta.env.VITE_API_URL + '/auth/signup',
      {
        firstName,
        lastName,
        email,
        password,
      },
      { validateStatus: () => true },
    );

    if (status !== 200) {
      throw new Error(data.message);
    }

    setUser({
      token: data.token,
    });
    navigate('/');
  };

  const login = async ({ email, password }) => {
    const { data, status } = await axios.post(
      import.meta.env.VITE_API_URL + '/auth/login',
      {
        email,
        password,
      },
      { validateStatus: () => true },
    );

    if (status !== 200) {
      throw new Error(data.message);
    }

    setUser({
      token: data.token,
    });
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      signup,
      login,
      logout,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
