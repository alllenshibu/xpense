import React, { useEffect, useState } from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllFriends } from '@/services/friend';

export default function AddNewExpense() {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    let r = await fetchAllFriends();
    setFriends(r || []);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Friends</h2>
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-md mx-auto rounded overflow-hidden h-[400px] w-[400px]  bg-gradient-to-r">
          <div className="h-full w-full flex items-center justify-center ">
            <div className="flex flex-col gap-4 ">
              <p className="text-2xl font-bold">Friends</p>
              {friends.map((friend) => (
                <div className="flex flex-row  text-left p-4 gap-4 shadow-lg w-[400px]">
                  <div className="w-20 h-20 rounded-[100px] bg-contain bg-[url('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png')]">
                    {' '}
                  </div>
                  <div className="flex flex-col gap-2  px-10 justify-start self-start text-left">
                    <p className="font-bold text-3xl">{friend.firstName}</p>
                    <p className="text-black">{friend.email}</p>
                  </div>
                  <div className="flex flex-row gap-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
