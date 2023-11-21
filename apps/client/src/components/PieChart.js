import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchAllCategories, fetchCategorysum } from '@/services/category';

const PieChart = () => {
  const chartRef = useRef(null);
  // Default to the current year
  const [categories, setCategories] = useState([]);
  const colors = [
    'rgba(47, 211, 233, 0.81)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 205, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    // Add more colors as needed
  ];
  const fetchCategories = async () => {
    const res = await fetchCategorysum();
    if (res.status === 200) {
      setCategories(res.data);
      console.log(res?.data);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const updateChart = () => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx && chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      chartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categories.map((category) => category.name),
          datasets: [
            {
              label: 'Income',
              data: categories.map((category) => category.total_expense),
              backgroundColor: colors,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: `Monthly Analysis `,
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    }
  };
  useEffect(() => {
    fetchCategories();
    updateChart();
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div style={{ height: '300px', border: '1px solid #ccc', padding: '0px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default PieChart;
