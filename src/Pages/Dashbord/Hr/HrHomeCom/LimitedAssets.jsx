import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const LimitedAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: limited = [], isLoading } = useQuery({
    queryKey: ["limited", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/limitedStock/${user?.email}`);
      return data;
    },
  });
  console.log(limited);
  if (isLoading) return;
  return (
    <div className="w-full">
      <div className="w-full h-[400px]   bg-white border shadow-md rounded-md">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Top Most Requests</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Total Request</th>
            </tr>
          </thead>
          <tbody>
            {limited.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.productType}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LimitedAssets;
