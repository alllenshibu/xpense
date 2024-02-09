import { useState } from 'react';

import axios from 'axios';

import { useAuth } from './useAuth';

export const useFetch = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const get = async ({ endpoint = '', headers = {} }) => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(import.meta.env.VITE_API_URL + endpoint, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization: user.token ? 'Bearer ' + user.token : '',
        },
        validateStatus: () => true,
      });

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const post = async ({ endpoint = '', headers = {}, body = {} }) => {
    setLoading(true);
    try {
      const { data, status } = await axios.post(import.meta.env.VITE_API_URL + endpoint, body, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization: user.token ? 'Bearer ' + user.token : '',
        },
        validateStatus: () => true,
      });

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const put = async ({ endpoint = '', headers = {}, body = {} }) => {
    setLoading(true);
    try {
      const { data, status } = await axios.put(import.meta.env.VITE_API_URL + endpoint, body, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization: user.token ? 'Bearer ' + user.token : '',
        },
        validateStatus: () => true,
      });

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const del = async ({ endpoint = '', headers = {} }) => {
    setLoading(true);
    try {
      const { data, status } = await axios.delete(import.meta.env.VITE_API_URL + endpoint, {
        headers: {
          ...headers,
          contentType: 'application/json',
          Authorization: user.token ? 'Bearer ' + user.token : '',
        },
        validateStatus: () => true,
      });

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  return { loading, get, post, put, del };
};
