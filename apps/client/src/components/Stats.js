import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { fetchStats } from '@/services/stats';

export default function Stats() {
  const [stats, setStats] = useState({});

  const fetchEverything = async () => {
    try {
      const r = await fetchStats();
      setStats(r);
      console.log({ r });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <div className="w-full h-40 mb-4 px-8 flex flex-row justify-between items-center bg-neutral-400 rounded shadow-lg">
      <div>
        <p className="text-sm font-semibold tracking-widest">BUDGET</p>
        <p className="text-4xl font-bold tracking-wide">₹4500</p>
      </div>
      <div>
        <p className="text-sm font-semibold tracking-widest">SPENT</p>
        <p className="text-4xl font-bold tracking-wide">₹{stats.currentMonthSpent}</p>
      </div>
      <div>
        <p className="text-sm font-semibold tracking-widest">LEFT</p>
        <p className="text-4xl font-bold tracking-wide">₹3500</p>
      </div>
    </div>
  );
}
