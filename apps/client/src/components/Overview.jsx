import { RiErrorWarningLine } from 'react-icons/ri';

const Overview = () => {
  return (
    <div className="w-full h-2/6 px-10 py-1 flex flex-row justify-between items-center ">
      <p className="text-5xl font-semibold tracking-wide">21st March</p>
      <div className="h-40 w-96 rounded-xl bg-orange-200 flex flex-col justify-center items-center">
        <p className="flex flex-row">
          <strong className="text-4xl">Rs. 4,397</strong>
          <RiErrorWarningLine className="text-xl text-red-600" />
        </p>
        <p className="text-xl">
          Target <strong>Rs. 4,000</strong>
        </p>
      </div>
    </div>
  );
};

export default Overview;
