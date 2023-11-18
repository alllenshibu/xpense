import { addNewIncome } from '@/services/expense';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function IncomeEditor() {

  const router = useRouter();

  const [income, setIncome] = useState({
    amount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addNewIncome(income);
    if (res.status === 201) {
      router.push('/dashboard');
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <form
      className="w-full md:w-2/5 flex flex-col gap-4"
      onChange={(e) => {
        e.preventDefault();
        setIncome({ ...income, [e.target.name]: e.target.value });
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input id="amount" name="amount" type="number" value={income.amount} placeholder="$1000" />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit" className="w-auto btn btn-primary">
          {'Submit'}
        </button>
      </div>
    </form>
  );
}
