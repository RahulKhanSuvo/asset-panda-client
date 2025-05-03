import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HRBarChart = ({ activity }) => {
  const data = {
    labels: ["Total Request", "Rejected", "Returned", "Approved"],
    datasets: [
      {
        label: "Requests",
        data: [
          activity?.totalRequests || 0,
          activity?.totalRejected || 0,
          activity?.totalReturned || 0,
          activity?.totalApproved || 0,
        ],
        backgroundColor: [
          "#4CAF50", // Approved
          "#F44336", // Rejected
          "#FF9800", // Returned
          "#2196F3", // Pending
        ],
        borderColor: ["#388E3C", "#D32F2F", "#F57C00", "#1976D2"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: "HR Request Breakdown",
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="relative h-64 sm:h-72 md:h-80 lg:h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HRBarChart;
