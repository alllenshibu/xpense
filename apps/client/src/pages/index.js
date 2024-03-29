import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { fetchStats } from '@/services/stats';

import DashboardLayout from '@/layouts/DashboardLayout';
import Income from '@/components/Income';
import Expense from '@/components/Expense';
import Category from '@/components/Category';
import PaymentOption from '@/components/PaymentOption';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();

  const [stats, setStats] = useState({
    currentMonthSpent: '',
    expenses: [],
    incomes: [],
    categories: [],
    paymentOptions: [],
  });

  const fetchEverything = async () => {
    let r = await fetchStats();
    console.log(r);
    setStats(
      r || {
        currentMonthSpent: '',
        expenses: [],
        incomes: [],
        categories: [],
        paymentOptions: [],
      },
    );
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <DashboardLayout>
      {/* Stats */}
      <div className="w-full h-40 mb-4 px-8 flex flex-row justify-between items-center bg-neutral-400 rounded shadow-lg">
        <div>
          <p className="text-sm font-semibold tracking-widest">BUDGET</p>
          <p className="text-4xl font-bold tracking-wide">₹{stats?.budget?.target}</p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest">SPENT</p>
          <p className="text-4xl font-bold tracking-wide">₹{stats?.budget?.spent}</p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest">LEFT</p>
          <p className="text-4xl font-bold tracking-wide">₹{stats?.budget?.left}</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-semibold tracking-wide flex flex-row gap-4">
            Latest Expenses
            <Link href="/expense" className="text-sm">
              More
            </Link>
          </p>
          <div className="flex flex-row gap-2">
            {stats?.expenses.map((expense) => (
              <Expense expense={expense} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-3xl font-semibold tracking-wide flex flex-row gap-4">
            Latest Incomes
            <Link href="/income" className="text-sm">
              More
            </Link>
          </p>
          <div className="flex flex-row gap-2">
            {stats?.incomes.map((income) => (
              <Income income={income} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold flex flex-row gap-4">
            Top Categories
            <Link href="/category" className="text-sm">
              More
            </Link>
          </p>
          <div className="flex flex-row gap-2">
            {stats?.categories.map((category) => (
              <Category category={category} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold flex flex-row gap-4">
            Top Payment Options
            <Link href="/paymentoption" className="text-sm">
              More
            </Link>
          </p>
          <div className="flex flex-row gap-2">
            {stats?.paymentOptions.map((paymentOption) => (
              <PaymentOption paymentOption={paymentOption} />
            ))}
          </div>
        </div>
        <button
          className="absolute right-32 bottom-24 h-10 w-10 p-1 rounded-full bg-black text-white"
          onClick={() => {
            router.push('/expense/new');
          }}
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
