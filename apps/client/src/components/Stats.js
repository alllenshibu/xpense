import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Stats() {
  const [cookies, setCookie] = useCookies(['token']);

  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/stats', {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    if (response.status === 200) {
      setStats(response.data);
    }
  };

  useEffect(() => {
    // fetchStats()
  }, []);

  return <div> {JSON.stringify(stats)}</div>;
}
