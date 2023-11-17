import axiosInstance from '@/lib/axiosInstance';
import React,{useEffect} from 'react'

const MainCard = () => {

  const [income, setIncome] = React.useState(0);
  const [expenses, setExpenses] = React.useState(0);
   const fetchExpenses = async () => {
     const res = await axiosInstance.get('/expenditure');
     if (res.status === 200) {
       setExpenses(res?.data?.total);
       console.log(res?.data?.total);
     } else if (res.status === 500) {
       alert('Something went wrong with the server');
     } else {
       alert('Something went wrong');
     }
   };
   useEffect(() => {
      fetchExpenses();
    }, []);

  return (
    <div className="bg-[#84C4BF] shadow-[rgba(0,_0,_0,_0.3)_0px_15px_50px_-16px] text-white p-5 rounded-2xl ">
      <div className="flex flex-col">
        <div className="text-3xl text-white flex flex-col p-2 font-bold">
          <p className="text-xl font-normal">Total Balance</p>
          <p>$1500.00</p>
        </div>
        <div className="flex flex-row p-2  justify-between items-stretch text-xl">
          <div className="flex flex-col">
            <div>Income</div>
            <p className="font-semibold">₹1000</p>
          </div>
          <div className="flex flex-col">
            <div>Expenses</div>
            <p className="font-semibold">₹{expenses}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard