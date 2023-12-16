import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import DashboardLayout from '@/layouts/DashboardLayout';
import Stats from '@/components/Stats';
import Expense from '@/components/Expense';
import { fetchAllExpenses } from '@/services/expense';
import { fetchAllCategories } from '@/services/category';
import Category from '@/components/Category';
import { fetchAllPaymentOptions } from '@/services/paymentOption';
import PaymentOption from '@/components/PaymentOption';

export default function Dashboard() {
  const router = useRouter();

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const fetchEverything = async () => {
    let r = await fetchAllExpenses();
    setExpenses(r || []);
    r = await fetchAllCategories();
    setCategories(r || []);
    r = await fetchAllPaymentOptions();
    setPaymentOptions(r || []);
  };

  const handleAddNewExpense = () => {
    router.push('/expense/new');
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <DashboardLayout>
      <Stats />
      <div className="flex flex-col justify-start items-start gap-4">
        <div className="flex flex-row">
          {expenses.map((expense) => (
            <Expense expense={expense} />
          ))}
        </div>
        <div className="flex flex-row">
          {categories.map((category) => (
            <Category category={category} />
          ))}
        </div>
        <div className="flex flex-row">
          {paymentOptions.map((paymentOption) => (
            <PaymentOption paymentOption={paymentOption} />
          ))}
        </div>
        <button
          className="absolute right-32 bottom-24 h-10 w-10 p-1 rounded-full bg-black text-white"
          onClick={handleAddNewExpense}
        >
          <svg
            width="auto"
            height="auto"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </DashboardLayout>
  );
}
