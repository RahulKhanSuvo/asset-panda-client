import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

ChartJS.register(ArcElement, Tooltip, Legend);

const HrPie = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData", user?.email],
    queryFn: async () => {
      if (!user?.email) return { returnable: 0, nonReturnable: 0 };
      const { data } = await axiosSecure(`/returnableCount/${user?.email}`);
      return data;
    },
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
  });

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">Loading...</div>
    );
  }

  const data = {
    labels: ["Returnable Items", "Non-Returnable Items"],
    datasets: [
      {
        label: "Item Distribution",
        data: [chartData?.returnable || 0, chartData?.nonReturnable || 0],
        backgroundColor: ["rgba(255, 129, 50, 1)", "rgba(54, 162, 235, 0.7)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
      tooltip: {
        enabled: true,
        bodyFont: {
          size: window.innerWidth < 768 ? 10 : 12,
        },
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14,
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-center font-semibold text-lg mb-2">
        Employee Request Summary
      </h2>
      <div className="relative  ">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default HrPie;
