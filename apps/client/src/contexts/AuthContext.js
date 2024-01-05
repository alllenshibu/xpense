'use client';

import { createContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);

  const router = useRouter();

  const signup = async ({ firstName, lastName, email, password }) => {
    const { data, status } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/auth/signup',
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
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    });
    router.push('/');
  };

  const login = async ({ email, password }) => {
    const { data, status } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/auth/login',
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
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    });
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
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
