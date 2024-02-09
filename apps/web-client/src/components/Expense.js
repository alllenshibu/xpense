import { useRouter } from 'next/router';

import { MdOutlineEdit } from 'react-icons/md';
import { AiOutlineSplitCells } from 'react-icons/ai';

export default function Expense({ expense }) {
  const router = useRouter();

  return (
    <div
      key={expense?.id}
      className="relative max-h-40 max-w-40 overflow-hidden px-8 py-4 flex flex-col justify-evenly items-start bg-neutral-50 rounded shadow-lg"
    >
      <MdOutlineEdit
        className="absolute right-8 top-2 hover:cursor-pointer"
        onClick={() => {
          router.push(`/expense/${expense.id}/edit`);
        }}
      />
      <AiOutlineSplitCells
        className="absolute right-2 top-2 hover:cursor-pointer"
        onClick={() => {
          router.push(`/split/new/${expense.id}`);
        }}
      />
      <p className="font-semibold tracking-wide">{expense?.title}</p>
      <p className="text-3xl font-bold tracking-wider">₹{expense.amount}</p>
      <p>{new Date(expense.timestamp).toDateString()} </p>
    </div>
  );
}
