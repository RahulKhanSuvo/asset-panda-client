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
          activity.totalRequests,
          activity.totalRejected,
          activity.totalReturned,
          activity.totalApproved,
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
      },
      title: {
        display: true,
        text: "HR Request Breakdown",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] border mt-6 bg-white rounded-md shadow-md p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HRBarChart;
