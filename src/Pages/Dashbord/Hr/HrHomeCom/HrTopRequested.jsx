import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const HrTopRequested = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: topRq = [], isLoading } = useQuery({
    queryKey: ["topRequests", user?.email],
    enabled: !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/mostRequested/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full bg-white border shadow-md rounded-md">
        <div className="px-4 border-b py-4">
          <h3 className="text-lg font-medium opacity-75">Top Most Requests</h3>
        </div>
        <div className="md:h-[415px] overflow-x-auto">
          <table className="table text-base w-full">
            <thead>
              <tr className="text-base uppercase">
                <th className="opacity-50">#</th>
                <th className="opacity-50">Assets</th>
                <th className="opacity-50">Type</th>
                <th className="text-center opacity-50">Total Request</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td>
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-16 bg-gray-200 rounded capitalize"></div>
                  </td>
                  <td className="text-center">
                    <div className="h-4 w-8 bg-gray-200 rounded mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div className="md:h-[415px] overflow-x-auto">
          <table className="table text-base w-full">
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
