import React, { useEffect, useState } from 'react';

import axios from 'axios';
import  Left from './Left/Left';

const Friends = ({ user }) => {
  const [friends, setFriends] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/friends/getFriends/${user.username}`, {

  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setFriends(res.data);
  //     });
  // }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <p className="text-4xl font-semibold">Friends</p>
        <Left/> 
    </div>
  );
};

export default Friends;
