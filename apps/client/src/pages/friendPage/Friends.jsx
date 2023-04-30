import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Left from './Left/Left';
import FriendBar from './Right/friendBar';
import RequestBar from './Left/RequestBar';

const Friends = ({ user }) => {
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

  const [friends, setFriends] = useState([]);
  const username = JSON.parse(localStorage.getItem('user')).username;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/friends/getFriends/${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  }, []);

  const [friendName, setFriendName] = useState('');

  const handleAddFriend = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/friends/send`, {
        username: username,
        reciever: friendName,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/friends/getRequests/user1`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setRequests(res.data);
        });
    fetchRequests()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <p className="text-4xl font-semibold">Friends</p>

      <div className="w-full h-full flex">
        <div>
          <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <p className="text-4xl font-semibold">Add Friend</p>
            <div className="flex">
              <input
                type="text"
                placeholder="Friend's Username"
                onChange={(e) => {
                  setFriendName(e.target.value);
                }}
              />
              <button type="submit" className="btn btn-primary" onClick={handleAddFriend}>
                Add Friend
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <p
              className="text-4xl font-semibold border-b-2 border-gray-300 pb-2
        "
            >
              Incoming Requests
            </p>
            {requests.incoming &&
              requests.incoming.map((request) => (
                <RequestBar friendId={request.id} friendName={request.name} type="received" />
              ))}
            <p
              className="text-4xl font-semibold border-b-2 border-gray-300 pb-2
        "
            >
              Outgoing Requests
            </p>
            {requests.outgoing &&
              requests.outgoing.map((request) => (
                <RequestBar friendId={request.id} friendName={request.name} type="sent" />
              ))}
          </div>
        )}
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
          <p className="text-4xl font-semibold border-b-2 ">Friends</p>
          <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            {friends.map((friend) => {
              return <FriendBar friend={friend} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
