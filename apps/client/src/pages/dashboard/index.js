import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useCookies } from 'react-cookie';

import DashboardLayout from '@/layouts/DashboardLayout';

import { fetchExpense } from '@/services/expenseServices';
import MainCard from '@/components/ui/maincard';
import Catcards from '@/components/ui/cat_cards';

export default function AddNewExpense() {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(['token']);

  const [expense, setExpense] = useState({});

  useEffect(() => {
    fetchExpense(cookies.token, router.query.id).then((data) => {
      setExpense(data);
    });
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex md:grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <MainCard />

          <div className="flex flex-row justify-between gap-4">
            <Catcards />
            <Catcards />
            <Catcards />
          </div>
        </div>
        <div
          className="bg-[#D9D9D954] h-full rounded-xl "></div>
      </div>
    </DashboardLayout>
  );
}
