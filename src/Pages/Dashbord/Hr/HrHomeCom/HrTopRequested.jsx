import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const HrTopRequested = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: topRq } = useQuery({
    queryKey: ["topRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/mostRequested/${user?.email}`);
      return data;
    },
  });
  console.log(topRq);
  return (
    <>
      {" "}
      <div className="mt-8">
        <div className=" h-[400px] overflow-x-auto  bg-white border shadow-md rounded-md w-full">
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
                <th>Total Request</th>
              </tr>
            </thead>
            <tbody>
              {topRq.map((item) => (
                <tr key={item._id}>
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
