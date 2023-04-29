import React, { useState } from 'react';

import axios from 'axios';

const AddNewExpense = ({ user }) => {

  const username = JSON.parse(localStorage.getItem('user')).username;
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');

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
    console.log({ expense, user });

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/expense/add/${username}`, {
      username: user.username,
      expense,
    });
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
      <button className="btn" onClick={addNewExpense}>
        Add
      </button>
    </div>
  );
};

export default AddNewExpense;
