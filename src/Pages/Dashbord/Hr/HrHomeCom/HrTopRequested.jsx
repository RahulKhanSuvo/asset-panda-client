import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const HrTopRequested = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: topRq, isLoading } = useQuery({
    queryKey: ["topRequests", user?.email],
    enabled: !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/mostRequested/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full bg-white border shadow-md rounded-md p-4">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500" />
          <p className="mt-2 text-gray-500">Loading top requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full bg-white border shadow-md rounded-md">
        <div className="px-4 border-b py-4 text-lg font-medium">
          <h3>Top Most Requests</h3>
        </div>
        {/* Add overflow-x-auto here */}
        <div className="md:h-[415px] overflow-x-auto">
          <table className="table text-base w-full">
            {/* head */}
            <thead>
              <tr className="text-base uppercase">
                <th>#</th>
                <th>Assets</th>
                <th>Type</th>
                <th className="text-center">Total Request</th>
              </tr>
            </thead>
            <tbody>
              {topRq.map((item, index) => (
                <tr key={item.name}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="capitalize">{item.assetType}</td>
                  <td className="text-center">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrTopRequested;
