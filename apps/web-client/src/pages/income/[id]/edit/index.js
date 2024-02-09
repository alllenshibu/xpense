import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import IncomeEditor from '@/components/IncomeEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { editIncome, fetchIncomeById } from '@/services/income';

export default function AddNewExpense() {
  const router = useRouter();

  const [income, setIncome] = useState({});
  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const fetchEverything = async () => {
    try {
      const incomeId = router.query.id;
      if (!incomeId) return;

      let r = await fetchIncomeById(incomeId);
      setIncome(r || {});
      setIncome((prevIncome) => ({
        ...prevIncome,
        timestamp: new Date(r?.timestamp).toISOString().slice(0, 16),
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const incomeId = router?.query?.id;
      const r = await editIncome(incomeId, income);
      router.push('/');
    } catch (err) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    fetchEverything();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        <IncomeEditor
          income={income}
          setIncome={setIncome}
          submitText={'Edit'}
          handleSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}
