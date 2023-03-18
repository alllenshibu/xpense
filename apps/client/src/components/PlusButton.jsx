import { AiOutlinePlus } from 'react-icons/ai';

const PlusButton = () => {
  return (
    <button className="h-12 w-12 rounded-full p-2 flex justify-center items-center text-5xl bg-black text-white">
      <AiOutlinePlus />
    </button>
  );
};

export default PlusButton;
