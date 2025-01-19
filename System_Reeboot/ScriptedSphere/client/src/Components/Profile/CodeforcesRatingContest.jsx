import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const CodeforcesRatingChart = ({ rankingHistory }) => {
  // Filter and process valid contest data
  const validRankingHistory = rankingHistory

  // Data for the chart
  const data = {
    labels: validRankingHistory.map((contest) => `Contest ${contest.contestId}`), // Contest identifiers
    datasets: [
      {
        label: 'Rating',
        data: validRankingHistory.map((contest) => contest.rating), // Ratings
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Codeforces Contest Rating Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Contests',
        },
        ticks: {
            display: true, // Hides the labels on the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'Rating',
        },
        beginAtZero: false,
      },
    },
  };

  // Render the chart
  return (
    <div className='w-full'>
      <h2>Codeforces Rating Chart</h2>
      <Line data={data} options={options}  />
    </div>
  );
};

export default CodeforcesRatingChart;
