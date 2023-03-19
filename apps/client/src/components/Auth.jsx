import React, { useState } from 'react';

import axios from 'axios';

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
      });
  };

  const hanldeSignup = (e) => {
    e.preventDefault();
    console.log({ username, password });
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
          console.log(username);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
          console.log(password);
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
