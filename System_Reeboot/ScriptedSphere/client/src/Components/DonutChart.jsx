
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom Plugin to Draw Center Text

export default function DonutChart({easy,medium,hard,totalQuestions}) {
    // console.log(easy,"     ",totalQuestions);

    if(easy===0 && medium===0 && hard===0){
      medium=1;
    }
    
    const centerTextPlugin = {
        id: "centerText",
        beforeDraw(chart) {
          const { width, height, ctx } = chart;
          ctx.restore();
      
          const fontSize = (height / 6).toFixed(2); // Adjust font size
          ctx.font = `${fontSize}px sans-serif`;
          ctx.textBaseline = "middle";
      
          const text = totalQuestions || 0; 
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;
      
          ctx.fillStyle = "#d1d5db" ; // Black text
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      };
    
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Questions",
        data: [easy,medium,hard],
        backgroundColor: [
          "rgba(74, 222, 128, 1)", // Green
          "rgba(250, 204, 21, 1)", // Yellow
          "rgba(248, 113, 113, 1)", // Red
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(248, 113, 113, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "75%", // Create a hollow center
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-2/4 max-w-md mx-auto mt-8 ">
      <h2 className="text-center text-xl font-semibold mb-4 opacity-75 ">Problems Solved</h2>
      <hr className="text-gray-500 mb-4" />
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
