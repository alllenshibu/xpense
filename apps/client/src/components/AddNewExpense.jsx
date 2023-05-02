import React, { useState, useEffect } from 'react';

import axios from 'axios';

const AddNewExpense = ({ user }) => {
  const username = JSON.parse(localStorage.getItem('user')).username;
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [isSplit, setIsSplit] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [splitFriends, setSplitFriends] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/friends/getFriends/${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  }, [isSplit]);

  const addNewExpense = async () => {
    const expense = {
      name: name,
      amount: amount,
      category: 'groceries',
      date: '2021-05-01',
      group: [
        {
          username: username,
          amount: amount,
        },
      ],
    };

    if (isSplit) {
      splitFriends.forEach((friend) => {
        expense.group.push({
          username: friend,
          amount: amount / (splitFriends.length + 1),
        });
      });
    }

    console.log({ expense, user });

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/expense/add/${username}`, {
      username: user.username,
      expense,
    });
  };

  const addFriendToSplit = () => {
    if (selectedFriend === '') return;
    if (splitFriends.includes(selectedFriend)) return;
    setSplitFriends([...splitFriends, selectedFriend]);
    console.log(splitFriends);
  };

  return (
    <div className="text-black p-6 flex flex-col justify-center items-center gap-4">
      <p className="text-2xl">New Expense</p>
      <input
        type="text"
        placeholder="Expense name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Expense amount"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />

      {isSplit ? (
        <>
          <select
            name="split-friends"
            id="split-friends"
            onChange={(e) => {
              setSelectedFriend(e.target.value);
              console.log(selectedFriend);
            }}
          >
            {friends.map((friend) => {
              return <option value={friend.username}>{friend.username}</option>;
            })}
          </select>
          <button className="btn" onClick={addFriendToSplit}>
            Add Friend
          </button>
        </>
      ) : null}
      <div className="flex flex-row gap-2">
        <button className="btn" onClick={() => setIsSplit(!isSplit)}>
          Split
        </button>
        <button className="btn" onClick={addNewExpense}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNewExpense;
