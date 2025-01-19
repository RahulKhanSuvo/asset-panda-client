import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

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
    <div className=" w-full">
      <div className=" md:h-[400px] overflow-x-auto bg-white border shadow-md rounded-md ">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Pending Requests</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {pendingRq.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      className="size-12
                       rounded-full"
                      src={item.userImage}
                      alt=""
                    />
                    <div>
                      <p className="font-medium">{item.userName}</p>
                      <p className="text-gray-500">{item.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td>{item.assetName}</td>
                <td>{item.requestDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;
