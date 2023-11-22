import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axiosInstance from '@/lib/axiosInstance';

const StackedBarChart = () => {
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // Default to the current year

  const [expenses, setExpenses] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const getExpenses = async () => {
    const res = await axiosInstance.get('/expensesbymonth');
    if (res.status === 200) {
      res.data.expenses.map((expense) => (expenses[expense.month - 1] = expense.sum));
      console.log(expenses);
      console.log(res.data.expenses);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };
  useEffect(() => {
    getExpenses();
  }, []);
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
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'June',
              'Jul',
              'Aug',
              'Sept',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Income',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
                backgroundColor: '#84C4BF',
                borderRadius: 5,
                borderWidth: 2,
              },
              {
                label: 'Expense',
                data: expenses,
                backgroundColor: '#045757',
                borderRadius: 5,
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            responsive: true,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(0, 0, 0, 0)',
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: 'rgba(0, 0, 0, 0)',
                  },
                },
              ],
              x: {
                stacked: false,
                display: true,
              },
              y: {
                stacked: false,
                display: false,
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
      {/* <div style={{ marginBottom: '10px' }}>
        <label htmlFor="yearDropdown">Select Year: </label>
        <select id="yearDropdown" onChange={handleYearChange} value={selectedYear}>
          <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
        </select>
      </div> */}
      <div style={{ width: '450px', height: '220px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default StackedBarChart;
