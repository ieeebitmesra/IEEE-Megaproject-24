import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const RatingChart = ({ rankingHistory,platform }) => {
  // Filter attended contests and prepare data
  const attendedContests = rankingHistory
    .filter(contest => contest.attended)
    .map(contest => ({
      title: contest.contest.title,
      rating: contest.rating,
      date: new Date(contest.contest.startTime * 1000).toLocaleDateString(),
    }));

  // Sort by date
  attendedContests.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Data for the chart
  const data = {
    labels: attendedContests.map(contest => contest.title), // Contest titles
    datasets: [
      {
        label: 'Rating',
        data: attendedContests.map(contest => contest.rating), // Ratings
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
        display: true,
        text: `${platform} Contest Rating Over Time`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Contests',
        },
        ticks: {
          display: false, // Hides the labels on the x-axis
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

  return <Line  data={data} options={options}  />;
};

export default RatingChart;
