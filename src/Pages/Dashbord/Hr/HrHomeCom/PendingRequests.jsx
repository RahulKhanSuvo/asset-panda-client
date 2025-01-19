import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PendingRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pendingRq = [] } = useQuery({
    queryKey: ["pendingRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/requestedAssets/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="mt-8">
      <div className=" overflow-x-auto bg-white border shadow-md rounded-md w-full">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <th>
              <tr>
                <h2>Pending Requests</h2>
              </tr>
            </th>
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
