import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Friends = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/friends/getFriends/${user.username}`, {

        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-row justify-center items-start gap-4">
        {friends.map((friend) => (
          <div
            key={friend.username}
            className="h-20 w-56 p-4 flex flex-col justify-between items-center rounded border border-gray-200"
          >
            <p className="font-semibold text-xl">{friend.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
