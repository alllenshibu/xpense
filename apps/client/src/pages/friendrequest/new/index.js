import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { sendNewFriendRequest } from '@/services/friend';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AddNewExpense() {
  const router = useRouter();

  const [requestedUser, setRequestedUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let r = sendNewFriendRequest(requestedUser);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Friend Requests</h2>
      <div className="h-full w-full flex items-center justify-center">
        <form className="w-full md:w-96 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="requestedUser">Email</label>
            <input
              onChange={(e) => setRequestedUser(e.target.value)}
              id="requestedUser"
              name="requestedUser"
              type="email"
              value={requestedUser}
            />
          </div>
          <div>
            <button type="submit" className="w-auto btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
