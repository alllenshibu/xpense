import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchAllCategories, fetchCategorysum } from '@/services/category';

// ... (import statements)

const PieChart = () => {
  const chartRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const colors = [
    'rgba(47, 211, 233, 0.81)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 205, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
  ];

  const fetchCategories = async () => {
    try {
      const res = await fetchCategorysum();
      if (res.status === 200) {
        setCategories(res.data);
        console.log(res.data);
      } else {
        console.error('Error fetching categories:', res.status);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const updateChart = () => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx && chartRef.current && categories.length > 0) {
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
            legend: {
              position: 'bottom', // Set the legend position to bottom
            },
          },
        },
      });

    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    updateChart();
  }, [categories]);

  return (
    <div>
      <div style={{ height: '300px', padding: '0px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default PieChart;
