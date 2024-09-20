import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = () => {
  const [timeframe, setTimeframe] = useState('24 Hours');

  const chartData = {
    '24 Hours': {
      labels: ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'],
      datasets: [
        {
          label: 'Price (past 24 hours) in USD',
          data: [29000, 29200, 29150, 29250, 29500, 29700, 29800, 29950, 30100, 30050, 30200, 30300],
          borderColor: '#87CEEB',
          backgroundColor: 'rgba(135, 206, 235, 0.2)',
          fill: true,
        },
      ],
    },
    '30 Days': {
      labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
      datasets: [
        {
          label: 'Price (past 30 days) in USD',
          data: [29000, 29300, 29500, 29700, 29900, 29800, 30300],
          borderColor: '#87CEEB',
          backgroundColor: 'rgba(135, 206, 235, 0.2)',
          fill: true,
        },
      ],
    },
    '3 Months': {
      labels: ['Month 1', 'Month 2', 'Month 3'],
      datasets: [
        {
          label: 'Price (past 3 months) in USD',
          data: [28000, 29500, 31000],
          borderColor: '#87CEEB',
          backgroundColor: 'rgba(135, 206, 235, 0.2)',
          fill: true,
        },
      ],
    },
    '1 Year': {
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      datasets: [
        {
          label: 'Price (past 1 year) in USD',
          data: [25000, 27000, 28000, 30000, 32000, 31000],
          borderColor: '#87CEEB',
          backgroundColor: 'rgba(135, 206, 235, 0.2)',
          fill: true,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <div className="w-full h-[500px] p-4 bg-[#1A1A1D] rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        {['24 Hours', '30 Days', '3 Months', '1 Year'].map((time) => (
          <button
            key={time}
            className={`px-4 py-2 m-2 text-white rounded ${
              timeframe === time ? 'bg-blue-400' : 'bg-gray-700'
            }`}
            onClick={() => setTimeframe(time)}
          >
            {time}
          </button>
        ))}
      </div>

      <Line options={options}  data={chartData[timeframe]}/>
    </div>
  );
};

export default LineChart;
