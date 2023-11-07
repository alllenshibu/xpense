import React from 'react'

const MainCard = () => {
  return (
    <div className="bg-[#84C4BF] text-white p-5 rounded-2xl shadow-md">
      <div className="flex flex-col">
        <div className="text-3xl text-white flex flex-col p-2 font-bold">
          <p className='text-xl font-normal'>Total Balance</p>
          <p>$1500.00</p>
        </div>
        <div className="flex flex-row p-2  justify-between items-stretch text-xl">
          <div className="flex flex-col">
            <div>Income</div>
            <p className='font-semibold'>$1000</p>
          </div>
          <div className="flex flex-col">
            <div>Expenses</div>
            <p className='font-semibold'>$750</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard