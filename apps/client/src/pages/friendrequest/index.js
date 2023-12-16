import React, { useEffect, useState } from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllFriendRequests } from '@/services/friend';
import FriendRequest from '@/components/FriendRequest';

export default function AddNewExpense() {
  const [friendRequests, setFriendRequests] = useState([]);

  const fetchFriendRequests = async () => {
    try {
      let r = await fetchAllFriendRequests();
      setFriendRequests(r || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Friend Requests</h2>
      <div className="h-full w-full flex items-center justify-center">
        {friendRequests.map((friendRequest) => (
          <FriendRequest key={friendRequest.friend_id} friendRequest={friendRequest} />
        ))}
      </div>
    </DashboardLayout>
  );
}
