import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from 'axios';

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user.email || !user.password) return alert('Please fill all the fields');

      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', user, {
        validateStatus: () => true,
      });

      if (res.status === 200) {
        localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN, res?.data?.token);
        router.push('/');
      } else if (res.status === 400) {
        alert('Something went wrong with the application');
      } else if (res.status === 401) {
        alert('Wrong credentials');
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-10">
      <div>
        <h1 className="text-5xl font-bold tracking-tighter">Xpense</h1>
      </div>
      <form
        className="w-full md:w-96 flex flex-col gap-4"
        onChange={(e) => {
          e.preventDefault();
          setUser({ ...user, [e.target.name]: e.target.value });
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        <div className="flex justify-center items-center">
          <p>
            New here?{' '}
            <Link className="font-bold" href="/signup">
              Signup
            </Link>
          </p>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit" className="w-auto btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
