import PieChart from '@/components/PieChart';
import StackedBarChart from '@/components/StackedBarChart';
import MainCard from '@/components/ui/maincard';
import DashboardLayout from '@/layouts/DashboardLayout';
import axiosInstance from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

export default function first(second) {
  const [expenses, setExpenses] = useState([]);
  const [expenses2, setExpenses2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [income, setIncome] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [current, setCurrent] = useState(0);
  const now = new Date();
  const month = now.getMonth() + 1;
  const getExpenses = async () => {
    const res = await axiosInstance.get('/expensesbymonth');

    if (res.status === 200) {
      res.data.expenses.expense.map((expense) => (expenses2[expense.month - 1] = expense.sum));
      res.data.expenses.income.map((income1) => (income[income1.month - 1] = income1.sum));
      setCurrent(expenses2[month - 1]);
      

      console.log(income);
      console.log(res.data);
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
  useEffect(() => {
    getExpenses();
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout background={'#f0f0f0'}>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col gap-2">
          <MainCard />
          <div className="flex flex-row  gap-4">
            <div className="flex flex-col  rounded-xl shadow-lg bg-white w-full p-4 ">
              <p className="font-semibold text-slate-500 text-left text-sm self-start px-4 ">
                Total Income
              </p>
              <p className="font-bold text-left text-xl self-start px-4">${income[month - 1]}</p>
              {income[month - 1] < income[month - 2] ? (
                <div className="bg-[rgba(250,0,0,0.2)] rounded-xl flex flex-row w-16 justify-center mx-4 mt-1">
                  <p className=" z-20 text-red-500 font-semibold   text-left text-sm self-center px-2">
                    {((income[month - 2] - income[month - 1]) / income[month - 1]) * 100}%
                  </p>
                </div>
              ) : (
                <div className="bg-[rgba(4,250,0,0.2)] rounded-xl flex flex-row w-16 justify-center mx-4 mt-1">
                  <p className=" z-20 text-green-500 font-semibold   text-left text-sm self-center px-2">
                    +{-((income[month - 2] - income[month - 1]) / income[month - 1]) * 100}%
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col  rounded-xl shadow-lg bg-white w-full p-4 ">
              <p className="font-semibold text-slate-500 text-left text-sm self-start px-4 ">
                Total Expense
              </p>
              <p className="font-bold text-left text-xl self-start px-4">${expenses2[month - 1]}</p>
              {expenses2[month - 1] > expenses2[month - 2] ? (
                <div className="bg-[rgba(250,0,0,0.2)] rounded-xl flex flex-row w-16 justify-center mx-4 mt-1">
                  <p className=" z-20 text-red-500 font-semibold   text-left text-sm self-center px-2">
                    {((expenses2[month - 2] - expenses2[month - 1]) / expenses2[month - 1]) * 100}%
                  </p>
                </div>
              ) : (
                <div className="bg-[rgba(4,250,0,0.2)] rounded-xl flex flex-row w-16 justify-center mx-4 mt-1">
                  <p className=" z-20 text-green-500 font-semibold   text-left text-sm self-center px-2">
                    +{-((income[month - 2] - income[month - 1]) / income[month - 1]) * 100}%
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center  w-[100%] rounded-xl shadow-lg p-4 gap-2 bg-white ">
            <p className="font-bold text-left text-xl">Latest Transactions</p>
            {expenses.slice(0, 5).map((expense) => (
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="font text-left font-semibold">{expense.title}</p>
                  <p className="text-left  text-slate-400 ">category</p>
                </div>
                <p className="font-semibold text-red-500">-${expense.amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col  items-center gap-2">
          <div className="flex flex-col justify-center items-center p-4 rounded-xl shadow-lg bg-white ">
            <StackedBarChart />
          </div>
          <div className="flex flex-col justify-center items-center w-[80%] rounded-xl shadow-lg bg-white ">
            <p className="font-bold text-left text-xl self-start p-4">Spending this month</p>
            <PieChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
