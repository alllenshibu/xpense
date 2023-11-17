import { addNewIncome } from '@/services/expense';
import { useState } from 'react';

export default function IncomeEditor() {
  const [income, setIncome] = useState({
    amount: 0,
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await addNewIncome(income);
      if (res.status === 201) {
        router.push('/dashboard');
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.message);
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
          { 'Submit'}
        </button>
      </div>
    </form>
  );
}
