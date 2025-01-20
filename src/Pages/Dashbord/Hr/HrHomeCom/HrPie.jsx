import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

ChartJS.register(ArcElement, Tooltip, Legend);

const HrPie = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: chartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chartData", user?.email],
    queryFn: async () => {
      if (!user?.email) return { returnable: 0, nonReturnable: 0 };
      const { data } = await axiosSecure(`/returnableCount/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return;
  }

  // Data for the Pie Chart
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

  // Options for the Pie Chart
  const options = {
    responsive: true,
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
    <div className="w-[500px] p-6  bg-white border shadow-md rounded-md mt-6">
      <h2 className="text-center">Employee Request Summary</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default HrPie;
