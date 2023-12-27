import React, { useDebugValue, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import IncomeEditor from '@/components/IncomeEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllFriends } from '@/services/friend';
import { fetchExpenseById } from '@/services/expense';

const submitText = 'Split';

export default function AddNewExpense() {
  const router = useRouter();

  const [friends, setFriends] = useState([]);
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
  });

  const [newFriendShare, setNewFriendShare] = useState({
    email: '',
    percentage: '',
  });

  const [split, setSplit] = useState([
    {
      email: 'kallenshibu@gmail.com',
      percentage: '100',
    },
  ]);

  const fetchEverything = async () => {
    let r = await fetchAllFriends();
    setFriends(r || []);
    r = await fetchExpenseById(router.query.expenseId);
    setExpense(r || {});
  };

  const recalculateShare = (e) => {
    e.preventDefault();
    let newSplit = [];
    const newPercentage = 100 / (split.length + 1);
    let entry;
    split.forEach((s) => {
      entry = s;
      entry.percentage = newPercentage;
      newSplit.push(entry);
    });

    entry = newFriendShare;
    entry.percentage = newPercentage;
    newSplit.push(entry);
    setSplit(newSplit);

    setFriends((prevFriends) => prevFriends.filter((f) => f.email !== newFriendShare.email));
  };

  useEffect(() => {
    setNewFriendShare({
      email: friends.filter((f) => !split.find((s) => s.email === f.email))[0]?.email,
    });
  }, [friends]);

  useEffect(() => {
    if (!router.query.expenseId) return;
    fetchEverything();
  }, [router.query.expenseId]);

  return (
    <DashboardLayout>
      <div className="h-full md:w-3/5 mx-auto flex items-center justify-center">
        <form className="w-full p-4 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <label htmlFor="title" className="text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={expense?.title}
              placeholder="Groceries"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={expense?.amount}
              placeholder="499.49"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryId" className="text-sm font-medium text-gray-600">
              Shares
            </label>
            {split.map((s, i) => (
              <div key={i} className="flex items-center justify-between mb-2">
                <div className="flex flex-row items-center">
                  <input
                    id={`email-${i}`}
                    name={`email-${i}`}
                    type="text"
                    value={s.email}
                    placeholder="Email"
                    className="input-field"
                  />
                  <input
                    id={`percentage-${i}`}
                    name={`percentage-${i}`}
                    type="number"
                    value={s.percentage}
                    placeholder="Percentage"
                    className="input-field"
                  />
                </div>
              </div>
            ))}
            {friends.length > 0 && (
              <div className="mb-4 flex flex-row justify-between items-center">
                <select
                  id="newFriendShare"
                  name="newFriendShare"
                  value={newFriendShare?.email}
                  onChange={(e) => {
                    setNewFriendShare({ ...newFriendShare, email: e.target.value });
                  }}
                >
                  {friends
                    .filter((f) => !split.find((s) => s.email === f.email))
                    .map((f) => (
                      <option key={f.id} value={f.email}>
                        {f.email}
                      </option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={recalculateShare}>
                  Add
                </button>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                console.log({ split });
                const r = await axiosInstance.post('/split/' + router.query.expenseId, {
                  split,
                });

                console.log({ r });
              }}
              type="submit"
              className="btn btn-primary"
            >
              {submitText ? submitText : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
