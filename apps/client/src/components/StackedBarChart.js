import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const StackedBarChart = () => {
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to the current year

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    const updateChart = () => {
      if (ctx && chartRef.current) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
        chartRef.current.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [
              {
                label: 'Income',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(47, 211, 233, 0.81)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
              {
                label: 'Expense',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(13, 125, 137, 0.8)',
                borderColor: 'rgba(13, 125, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: `Monthly Analysis - ${selectedYear}`,
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

    updateChart();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="yearDropdown">Select Year: </label>
        <select id="yearDropdown" onChange={handleYearChange} value={selectedYear}>
          <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
        </select>
      </div>
      <div style={{ width: '450px', height: '220px', border: '1px solid #ccc', padding: '10px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default StackedBarChart;
