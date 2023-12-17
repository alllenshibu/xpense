import { useRouter } from 'next/router';

import { MdOutlineEdit } from 'react-icons/md';

export default function Expense({ expense }) {
  const router = useRouter();

  const handleEditButtonClick = () => {
    console.log('Edit button clicked');
    router.push(`/expense/${expense.id}/edit`);
  };

  return (
    <div
      key={expense?.id}
      className="relative h-auto w-full px-8 py-4 flex flex-col justify-evenly items-start bg-neutral-50 rounded shadow-lg"
    >
      <MdOutlineEdit
        className="absolute right-2 top-2 hover:cursor-pointer"
        onClick={handleEditButtonClick}
      />
      <p className="font-semibold tracking-wide">{expense?.title}</p>
      <p className="text-3xl font-bold tracking-wider">₹{expense.amount}</p>
      <p>{new Date(expense.timestamp).toDateString()} </p>
    </div>
  );
}
