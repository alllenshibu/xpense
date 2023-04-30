import React, { useEffect, useState } from 'react';

import axios from 'axios';
import  Left from './Left/Left';
import Right from './Right/Right';

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
    <div>
      <p className="text-4xl font-semibold">Friends</p>
      
      <div className="w-full h-full flex">
          <Left/> 
          <Right/>
      </div>
    </div>
  );
};

export default Friends;
