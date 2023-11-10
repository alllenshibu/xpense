import React, { useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', user);
      if (res.status === 201) {
        localStorage.setItem('token', res?.data?.token);
        router.push('/');
      } else if (res.status === 409) {
        alert('User already exists');
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.message);
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
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value={user.firstName} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="test" value={user.lastName} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={user.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={user.password} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit" className="w-auto btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}
