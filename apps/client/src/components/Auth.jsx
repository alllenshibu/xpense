import React, { useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';

const Auth = ({ setUser }) => {
  const [isNewUser, setIsNewUser] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    await axios
      .post(`${import.meta.env.VITE_API_URL}/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setUser({ username: username });
        localStorage.setItem('user', JSON.stringify({ username: username }));
        setCookie('token', res.data.token, { path: '/' });
      });
  };

  const hanldeSignup = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setUser({ username: username });
        localStorage.setItem('user', JSON.stringify({ username: username }));
        setCookie('token', res.data.token, { path: '/' });
      });
  };

  return (
    <div className="w-96 h-full p-10 flex flex-col justify-center items-center gap-8">
      {isNewUser ? <p className="text-4xl font-semibold">Register</p> : <p className="text-4xl font-semibold">Login</p>}
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {isNewUser ? (
        <button
          onClick={() => {
            setIsNewUser(false);
          }}
        >
          Already registered?
        </button>
      ) : (
        <button
          onClick={() => {
            setIsNewUser(true);
          }}
        >
          New Here?
        </button>
      )}
      {isNewUser ? (
        <button type="submit" className="btn" onClick={hanldeSignup}>
          Register
        </button>
      ) : (
        <button type="submit" className="btn" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Auth;
