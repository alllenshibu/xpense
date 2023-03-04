import React, { useEffect, useState } from "react";

import axios from "axios";

const ExpenseExplorer = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/expense/getall`)
      .then((res) => {
        console.log(res);
        setExpenses(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }, []);

  return (
    <div>
      <h1>Expense Explorer</h1>

      <div>
        <p>Lunch</p>
        <p>495.00</p>
        <p>Eating out</p>
        <p>2021-09-01 1:20</p>
        {expenses.map((items) => {
          return <div>{items.name}</div>;
        })}
      </div>
    </div>
  );
};

export default ExpenseExplorer;
