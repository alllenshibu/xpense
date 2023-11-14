import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { sendNewFriendRequest } from '@/services/friend';
import Link from 'next/link';

export default function AddNewExpense() {
    const [requestedUser, setRequestedUser] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await sendNewFriendRequest(requestedUser);
        if (res.status === 201) {
            alert('Successfully sent friend request');
        } else if (res.status === 404) {
            alert('Cannot find requested user');
        } else if (res.status === 409) {
            alert('Friend request already exists');
        } else if (res.status === 500) {
            alert('Something went wrong with the server');
        } else {
            alert('Something went wrong');
        }
    };

    return (
        <DashboardLayout>
            <h2 className='text-4xl font-bold'>Friend Requests</h2>
            <div className='h-full w-full flex items-center justify-center'>
                <form className='w-full md:w-96 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='requestedUser'>Email</label>
                        <input
                            onChange={(e) => setRequestedUser(e.target.value)}
                            id='requestedUser'
                            name='requestedUser'
                            type='email'
                            value={requestedUser}
                        />
                    </div>
                    <div>
                        <button type='submit' className='w-auto btn btn-primary'>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
