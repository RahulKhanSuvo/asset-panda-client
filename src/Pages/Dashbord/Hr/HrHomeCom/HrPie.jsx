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
    return null; // Show spinner or placeholder if needed
  }

  const data = {
    labels: ["Returnable Items", "Non-Returnable Items"],
    datasets: [
      {
        label: "Item Distribution",
        data: [chartData.returnable, chartData.nonReturnable],
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
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full p-6 h-[300px] md:h-[400px] lg:h-[420px] mt-6">
      <h2 className="text-center font-semibold text-lg">
        Employee Request Summary
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default HrPie;
