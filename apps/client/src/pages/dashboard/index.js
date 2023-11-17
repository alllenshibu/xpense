import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/axiosInstance';
import Expense from '@/components/Expense';
import DashboardLayout from '@/layouts/DashboardLayout';
import axios from 'axios';
import MainCard from '@/components/ui/maincard';
import Catcards from '@/components/ui/cat_cards';
import ExpenseEditor from '@/components/ExpenseEditor';
import { addNewCategory, fetchAllCategories } from '@/services/category';
import CategoryEditor from '@/components/CategoryEditor';

export default function AddNewExpense() {
  const [categorynew, setCategorynew] = useState({
    name: '',
  });

  const handleSubmit2 = async (e) => {
    try {
      e.preventDefault();
      const res = await addNewCategory(category);
      if (res.status === 201) {
        router.push('/category');
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.message);
    }
  };

  const [income, setIncome] = React.useState(0);
  const [category, setCategory] = React.useState(0);
  const fetchCategory = async () => {
    const res = await axiosInstance.get('/getcategorysum');
    if (res.status === 200) {
      setCategory(res?.data?.total);
      console.log(res?.data?.total);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };
  // useEffect(() => {
  //   fetchExpenses();
  // }, []);

  const [expenses, setExpenses] = useState([]);

  const router = useRouter();

  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    categoryId: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axiosInstance.post('/expense', {
        expense: expense,
      });
      if (res.status === 201) {
        router.push('/dashboard');
        expenses.push(res.data.expense);
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.message);
    }
  };

  const fetchCategories = async () => {
    const res = await fetchAllCategories();
    if (res.status === 200) {
      setCategories(res.data.categories);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const fetchPaymentOptions = async () => {
    const res = await fetchAllPaymentOptions();
    if (res.status === 200) {
      setPaymentOptions(res.data.paymentOptions);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const fetchExpenses = async () => {
    const res = await axiosInstance.get('/expense');
    if (res.status === 200) {
      setExpenses(res?.data?.expenses);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const handleAddNewExpense = () => {
    router.push('/expense/new');
  };
  useEffect(() => {
    fetchCategories();
    fetchExpenses();
    fetchCategory();
  }, []);

  return (
    <DashboardLayout>
      <div className="h-[100vh] w-full flex md:grid md:grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4">
          <MainCard />

          <div className="flex flex-row justify-between gap-4">
            <Catcards />
            <Catcards />
            <Catcards />
          </div>
          <div className="flex flex-col gap-4  h-[70vh] overflow-y-scroll overflow-x-hidden">
            {expenses.map((expense) => (
              <Expense expense={expense} />
            ))}
          </div>
        </div>

        <div className="bg-[#D9D9D954] h-full overflow-y-scroll rounded-xl flex justify-center py-4 items ">
          <ExpenseEditor
            expense={expense}
            setExpense={setExpense}
            categories={categories}
            paymentOptions={paymentOptions}
            submitText={'Add'}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
