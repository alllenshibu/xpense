import { useRouter } from 'next/router';

import { MdOutlineEdit } from 'react-icons/md';

export default function PaymentOption({ paymentOption }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/paymentoption/${paymentOption.id}`);
  };

  const handleEditButtonClick = () => {
    console.log('Edit button clicked');
    router.push(`/paymentoption/${paymentOption.id}/edit`);
  };

  return (
    <div
      key={paymentOption?.id}
      className="relative h-auto w-full px-8 py-4 flex flex-col justify-evenly items-start bg-neutral-50 rounded shadow-lg"
      onClick={handleClick}
    >
      <MdOutlineEdit
        className="absolute right-2 top-2 hover:cursor-pointer"
        onClick={handleEditButtonClick}
      />
      <p className="font-semibold tracking-wide">{paymentOption?.name}</p>
      <p className="text-3xl font-bold tracking-wider">₹{paymentOption?.total}</p>
    </div>
  );
}
