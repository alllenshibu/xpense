import PieChart from '@/components/PieChart';
import StackedBarChart from '@/components/StackedBarChart';
import MainCard from '@/components/ui/maincard';
import DashboardLayout from '@/layouts/DashboardLayout';
import axiosInstance from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

export default function first(second) {
  const [expenses, setExpenses] = useState([]);

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
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout background={'#f0f0f0'}>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col gap-2">
          <MainCard />
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
