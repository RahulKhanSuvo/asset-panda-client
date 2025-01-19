import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const HrTopRequested = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: topRq, isLoading } = useQuery({
    queryKey: ["topRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/mostRequested/${user?.email}`);
      return data;
    },
  });
  console.log(topRq);
  if (isLoading) return;
  return (
    <>
      {" "}
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
              {topRq.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.assetType}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HrTopRequested;
