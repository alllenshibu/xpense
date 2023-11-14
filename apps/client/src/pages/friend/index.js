import React, {useEffect, useState} from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import {fetchAllFriends} from "@/services/friend";

export default function AddNewExpense() {
    const [friends, setFriends] = useState([]);

    const fetchFriends = async () => {
        const res = await fetchAllFriends();
        if (res.status === 200) {
            setFriends(res?.data?.friends);
        } else if (res.status === 500) {
            alert('Something went wrong with the server');
        } else {
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <DashboardLayout>
            <h2 className='text-4xl font-bold'>Friends</h2>
            <div className="h-full w-full flex items-center justify-center">
                {JSON.stringify(friends)}
            </div>
        </DashboardLayout>
    );
}
