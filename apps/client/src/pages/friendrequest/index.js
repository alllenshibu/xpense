import React, {useEffect, useState} from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import {fetchAllFriendRequests} from "@/services/friend";

export default function AddNewExpense() {
    const [friendRequests, setFriendRequests] = useState([]);

    const fetchFriendRequests = async () => {
        const res = await fetchAllFriendRequests();
        if (res.status === 200) {
            setFriendRequests(res?.data?.friendRequests);
        } else if (res.status === 500) {
            alert('Something went wrong with the server');
        } else {
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    return (
        <DashboardLayout>
            <h2 className='text-4xl font-bold'>Friend Requests</h2>
            <div className="h-full w-full flex items-center justify-center">
                {JSON.stringify(friendRequests)}
            </div>
        </DashboardLayout>
    );
}
