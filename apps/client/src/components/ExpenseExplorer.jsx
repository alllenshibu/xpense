import React, { useEffect, useState } from 'react';

import axios from 'axios';

const ExpenseExplorer = ({ user }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/expense/getall/user1`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        username: user.username,
      })
      .then((res) => {
        console.log(res.data);
        setExpenses(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});

    console.log(user);
  }, []);

  return (
    <div className="h-full flex flex-row justify-center items-center gap-4 flex-wrap">
      {expenses.map((items) => {

        const date = new Date(items.date).toLocaleDateString(); 
        return (
          <div
            className="h-64 w-48 p-4 flex flex-col justify-between items-center rounded border border-gray-200"
            key={items.exp_id}
          >
            <div className="text-xl">{items.name}</div>
            <div className="text-2xl font-bold">Amount : {items.amount}</div>
           {items.paid ? 
                items.amount !=items.owe_amount ? <div className="text-lg font-bold">You lent  Rs. {items.amount - items.owe_amount}</div> 
                 : <></>  
              : 
            <div className="text-lg font-bold">You owe Rs. {items.owe_amount}</div>
           }
            <div className="">Category : {items.c_name}</div>
            <div className="text-xs">{date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseExplorer;
