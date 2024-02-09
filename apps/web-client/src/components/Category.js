import { useRouter } from 'next/router';

import { MdOutlineEdit } from 'react-icons/md';

export default function Category({ category }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/category/${category.id}`);
  };

  const handleEditButtonClick = () => {
    console.log('Edit button clicked');
    router.push(`/category/${category.id}/edit`);
  };

  return (
    <div
      key={category?.id}
      className="relative max-h-40 max-w-40 overflow-hidden px-8 py-4 flex flex-col justify-evenly items-start bg-neutral-50 rounded shadow-lg"
      onClick={handleClick}
    >
      <MdOutlineEdit
        className="absolute right-2 top-2 hover:cursor-pointer"
        onClick={handleEditButtonClick}
      />
      <p className="font-semibold tracking-wide">{category?.name}</p>
      <p className="text-3xl font-bold tracking-wider">₹{category?.total}</p>
    </div>
  );
}
