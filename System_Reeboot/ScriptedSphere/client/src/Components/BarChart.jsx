import { useState } from 'react';
import ApexCharts from 'react-apexcharts';

const BarChart = ({ topics = [] }) => {
  const [showMore, setShowMore] = useState(false);

  const visibleTopics = showMore ? topics : topics.slice(0, 7); // Show top 7 topics initially
  const dynamicHeight = 50 * visibleTopics.length; // 50px per topic for dynamic height

  const options = {
    series: [
      {
        name: "Questions Solved",
        data: visibleTopics.map(topic => topic.count),
      },
    ],
    chart: {
      type: "bar",
      width: "100%",
      height: dynamicHeight, // Adjust height dynamically
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 0.8,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "center",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true, // Show count on bars
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
      },
      formatter: (value) => `${value}`, // Display count on each bar
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
      },
      x: {
        formatter: (value) => value,
      },
      y: {
        formatter: (value) => `${value}`, // Shows the solved questions
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      categories: visibleTopics.map(topic => topic.topic), // Use names of visible topics
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      min: 0,
      max: Math.max(...visibleTopics.map(topic => topic.count)), // Dynamic Y-axis max based on data
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 6,
        right: 2,
        top: -20,
      },
    },
  };

  return (
    <div id="bar-chart ">
      <ApexCharts options={options} series={options.series} type="bar" height={dynamicHeight} />
      <button
        onClick={() => setShowMore(!showMore)}
        className="p-2 bg-blue-500 text-white rounded mt-4"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default BarChart;
