// import React, { useEffect, useRef, useState } from 'react';
// import {Chart} from 'chart.js';
// import { fetchAllCategories, fetchCategorysum } from '@/services/category';

// // ... (import statements)

// const PieChart = () => {
//   const chartRef = useRef(null);
//   const [categories, setCategories] = useState([]);
//   const colors = ['#00BFA5', '#008080', '#00CED1', 'rgba(75, 192, 192, 0.8)'];

//   const fetchCategories = async () => {
//     try {
//       const res = await fetchCategorysum();
//       if (res.status === 200) {
//         setCategories(res.data);
//         console.log(res.data);
//       } else {
//         console.error('Error fetching categories:', res.status);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error.message);
//     }
//   };

//   const updateChart = () => {
//     const ctx = chartRef.current?.getContext('2d');
//     if (ctx && chartRef.current && categories.length > 0) {
//       if (chartRef.current.chart) {
//         chartRef.current.chart.destroy();
//       }
//       chartRef.current.chart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//           labels: categories.map((category) => category.name),
//           datasets: [
//             {
//               label: 'Income',
//               data: categories.map((category) => category.total_expense),
//               backgroundColor: colors,
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           plugins: {
//             legend: {
//               position: 'bottom',
//               borderRadius: 10,

//             },
//           },
//         },
//       });
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     updateChart();
//   }, [categories]);

//   return (
//     <div>
//       <div style={{ height: '300px', padding: '0px' }}>
//         <canvas ref={chartRef} />
//       </div>
//     </div>
//   );
// };

// export default PieChart;
