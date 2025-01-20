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
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/requestedAssets/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return;
  return (
    <div className="rounded-md w-full shadow-md border">
      <div className="rounded-md bg-white px-4 py-4 border-b flex justify-between items-center ">
        <h4 className="text-xl font-semibold">Pending Requests</h4>
        <Link to={"/hr/allRequests"}>
          <button className="text-blue-500">View All</button>
        </Link>
      </div>
      <div className=" md:h-[415px] overflow-x-auto rounded-md bg-white   ">
        <table className="table  rounded-md">
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
                      className="size-10
                       rounded-full"
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
