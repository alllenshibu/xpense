import { useRouter } from 'next/router';

import { MdOutlineEdit } from 'react-icons/md';

export default function Income({ income }) {
  const router = useRouter();

  const handleEditButtonClick = () => {
    console.log('Edit button clicked');
    router.push(`/income/${income.id}/edit`);
  };

  return (
    <div
      key={income?.id}
      className="relative max-h-40 max-w-40 overflow-hidden px-8 py-4 flex flex-col justify-evenly items-start bg-neutral-50 rounded shadow-lg"
    >
      <MdOutlineEdit
        className="absolute right-2 top-2 hover:cursor-pointer"
        onClick={handleEditButtonClick}
      />
      <p className="font-semibold tracking-wide">{income?.title}</p>
      <p className="text-3xl font-bold tracking-wider">₹{income?.amount}</p>
      <p>{new Date(income.timestamp).toDateString()} </p>
    </div>
  );
}
