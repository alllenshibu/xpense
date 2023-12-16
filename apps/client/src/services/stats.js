import axiosInstance from '@/lib/axiosInstance';

const fetchStats = async (limit = 20) => {
  try {
    const r = await axiosInstance.get('/stats');
    if (r.status === 200) {
      console.log(r);
      return r.data.stats;
    }
  } catch (e) {
    console.error(e);
  }
};

export { fetchStats };
