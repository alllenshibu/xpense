import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/axiosInstance';
import Expense from '@/components/Expense';
import DashboardLayout from '@/layouts/DashboardLayout';
import axios from 'axios';
import MainCard from '@/components/ui/maincard';
import Catcards from '@/components/ui/cat_cards';
import ExpenseEditor from '@/components/ExpenseEditor';
import { addNewCategory, fetchAllCategories, fetchCategorysum } from '@/services/category';
import CategoryEditor from '@/components/CategoryEditor';
import IncomeEditor from '@/components/IncomeEditor';
import { Bar } from 'react-chartjs-2';
import StackedBarChart from '@/components/StackedBarChart';
import nextAxiosInstance from '@/lib/nextAxiosInstance';

export default function AddNewExpense() {
  const [categorynew, setCategorynew] = useState({
    name: '',
  });

  const [categorysum, setCategorysum] = useState([]);

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

  const categorySum = async () => {
    const res = await fetchCategorysum();
    if (res.status === 200) {
      setCategorysum(res.data);
      console.log(res.data);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const fetchExpenses = async () => {
    const res = await nextAxiosInstance.get('/getexpenses');
    if (res.status === 200) {
      setExpenses(res?.data);
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
    categorySum();
  }, []);

  return (
    <DashboardLayout>
      <div className="h-[100vh] w-full flex md:grid flex-col md:grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4">
          <MainCard />

          <div className="flex flex-row justify-between gap-4">
            {categorysum.slice(0,4).map((category) => (
              <Catcards category={category.name} amount={category.total_expense} />
            ))}
          </div>

          <div className="flex flex-col gap-4  h-[70vh] overflow-y-scroll overflow-x-hidden">
            {expenses.map((expense) => (
              <Expense expense={expense} />
            ))}
          </div>
        </div>

        <div className="bg-[#D9D9D954] h-full overflow-y-scroll rounded-xl lg:flex-col py-4 items-center gap-4 hidden lg:flex">
          <p className="text-xl  font-bold px-4">Add Expense</p>
          <ExpenseEditor
            expense={expense}
            setExpense={setExpense}
            categories={categories}
            paymentOptions={paymentOptions}
            submitText={'Add'}
            handleSubmit={handleSubmit}
          />
          <p className="text-xl font-bold px-4">Add Income</p>
          <IncomeEditor />
        </div>
      </div>
    </DashboardLayout>
  );
}
