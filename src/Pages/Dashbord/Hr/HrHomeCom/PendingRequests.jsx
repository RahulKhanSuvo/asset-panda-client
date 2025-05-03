import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const PendingRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pendingRq = [], isLoading } = useQuery({
    queryKey: ["pendingRequests", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/requestedAssets/${user?.email}`);
      return data;
    },
  });

  // Render a blank loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="rounded-md w-full shadow-md border">
        <div className="rounded-md bg-white px-4 py-4 border-b flex justify-between items-center">
          <h4 className="text-xl font-semibold">Pending Requests</h4>
          <button className="text-blue-500 opacity-50 cursor-not-allowed">
            View All
          </button>
        </div>
        <div className="md:h-[415px] overflow-x-auto rounded-md bg-white">
          <table className="table rounded-md w-full">
            <thead>
              <tr className="text-base uppercase">
                <th className="opacity-50">Sender</th>
                <th className="opacity-50">Assets</th>
                <th className="text-center opacity-50">Date</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="size-10 rounded-full bg-gray-200"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-3 w-32 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="text-center">
                    <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
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
    <div className="rounded-md w-full shadow-md border">
      <div className="rounded-md bg-white px-4 py-4 border-b flex justify-between items-center ">
        <h4 className="text-xl font-semibold">Pending Requests</h4>
        <Link to={"/dashboard/hr/allRequests"}>
          <button className="text-blue-500">View All</button>
        </Link>
      </div>
      <div className="md:h-[415px] overflow-x-auto rounded-md bg-white">
        <table className="table rounded-md">
          {/* head */}
          <thead>
            <tr className="text-base uppercase">
              <th>Sender</th>
              <th>Assets</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {pendingRq.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      className="size-10 rounded-full"
                      src={item.userImage}
                      alt=""
                    />
                    <div>
                      <p className="">{item.userName}</p>
                      <p className="text-gray-500">{item.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td>{item.assetName}</td>
                <td className="text-center">
                  {format(new Date(item.requestDate), "MMM dd, yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;
