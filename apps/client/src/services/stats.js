import axiosInstance from '@/lib/axiosInstance';

const fetchStats = async (limit = 20) => {
  try {
    const r = await axiosInstance.get('/stats');
    if (r.status === 200) {
      return r.data.stats;
    }
  } catch (e) {
    console.error(e);
  }
};

export { fetchStats };

// Cache
// const fetchStats = async (limit = 20) => {
//   try {
//     let r = localStorage.getItem('_xpense_stats');
//     if (!r) {
//       r = await axiosInstance.get('/stats');
//       if (r.status === 200) {
//         localStorage.setItem(
//           '_xpense_stats',
//           JSON.stringify({
//             time: Date(),
//             stats: r.data.stats,
//           }),
//         );
//         return r.data.stats;
//       }
//     }
//     return JSON.parse(r).stats;
//   } catch (e) {
//     console.error(e);
//   }
// };
