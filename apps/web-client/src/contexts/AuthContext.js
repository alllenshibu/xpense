import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AUTH_TOKEN } from 'constants';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState(null);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = window.localStorage.getItem(AUTH_TOKEN);

      if (token) {
        if (router.pathname.startsWith('/auth')) {
          router.push('/');
        }
      } else {
        if (!router.pathname.startsWith('/auth/')) router.push('/auth/login');
      }
      setToken(token);
    }
    loadUserFromCookies();
  }, []);

  const signup = async ({ firstName, lastName, email, password }) => {
    try {
      const { data, status } = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      if (status === 200) {
        window.localStorage.setItem(AUTH_TOKEN, data.token);
        router.push('/auth/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data, status } = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        email,
        password,
      });
      if (status === 200) {
        window.localStorage.setItem(AUTH_TOKEN, data.token);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_TOKEN);
    setToken(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
