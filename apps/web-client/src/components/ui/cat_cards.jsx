import React from 'react';

const Catcards = ({ category, amount }) => {
  return (
    <div className="bg-slate-200 p-5 flex flex-col w-full rounded-xl ">
      <p className='font-semibold'>{category}</p>
      <p>₹{amount}</p>
    </div>
  );
};

export default Catcards;
