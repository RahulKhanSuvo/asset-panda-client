import { format } from "date-fns";
import Container from "../../../Components/Container";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdCalendarMonth, MdOutlinePendingActions } from "react-icons/md";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Default theme

const EmployeeHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pendingRq = [], isLoading } = useQuery({
    queryKey: ["pendingRq", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/requestedAssets/${user?.email}`);
      return data;
    },
  });
  // for monthly request
  const { data: monthlyRequests, isLoading: mLoading } = useQuery({
    queryKey: ["monthlyRq", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/monthlyRequests/${user?.email}`);
      return data;
    },
  });
  console.log(monthlyRequests);

  if (isLoading || mLoading) return <div>Loading...</div>;

  return (
    <Container>
      <div className="mt-8 flex flex-col md:flex-row gap-6">
        <div className=" w-full bg-gradient-to-r shadow-md from-[#664EC9] shadow-indigo-400 rounded-md text-white p-6 to-[#9783E9]">
          <h3 className="text-xl">Pending Requests</h3>
          <div className="flex justify-between sh items-center">
            <h2 className="text-2xl">{pendingRq.length}</h2>
            <h3 className="text-white">
              <MdOutlinePendingActions size={40} />
            </h3>
          </div>
          <p>Awaiting approval or action.</p>
        </div>
        <div className=" w-full bg-gradient-to-r from-[#FA5520] shadow-md shadow-orange-300 rounded-md text-white p-6 to-[#F6A600]">
          <h3 className="text-xl"> Monthly Requests</h3>
          <div className="flex justify-between sh items-center">
            <h2 className="text-2xl">{monthlyRequests.length}</h2>
            <h3 className="text-white">
              <MdCalendarMonth size={40} />
            </h3>
          </div>
          <p>Awaiting approval or action.</p>
        </div>
      </div>
      <div>
        <section className="flex justify-between flex-col lg:flex-row mt-6 gap-6">
          <div className="bg-white border  shadow-md rounded-md w-full">
            <div className="overflow-x-auto w-full">
              <table className="table">
                {/* head */}
                <thead className="">
                  <tr>
                    <th colSpan="3">
                      <p className="py-2 pl- text-lg text-black">
                        Pending Requests
                      </p>
                    </th>
                  </tr>
                  <tr className="uppercase text-[#444050]">
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {pendingRq.map((rq, index) => (
                    <tr key={rq._id}>
                      <th>{index + 1}</th>
                      <td>{rq.assetName}</td>
                      <td>{rq.assetType}</td>
                      <td>{format(new Date(rq?.requestDate), "yyyy-MM-dd")}</td>
                      <td>
                        <p
                          className={
                            rq.status === "pending" &&
                            "bg-[#FFE2E3] w-fit px-3 py-1 text-[#FF8487] rounded-md"
                          }
                        >
                          {" "}
                          {rq.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white border  w-full shadow-md rounded-md">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="">
                  <tr>
                    <th colSpan="3">
                      <p className="py-2 pl- text-lg text-black">
                        Monthly Requests
                      </p>
                    </th>
                  </tr>
                  <tr className=" uppercase text-[#444050]">
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {monthlyRequests.map((rq, index) => (
                    <tr key={rq._id}>
                      <th>{index + 1}</th>
                      <td>{rq.assetName}</td>
                      <td>{rq.assetType}</td>
                      <td>{format(new Date(rq?.requestDate), "yyyy-MM-dd")}</td>
                      <td>
                        <p
                          className={
                            rq.status === "pending" &&
                            "bg-[#FFE2E3] w-fit px-3 py-1 text-[#FF8487] rounded-md"
                          }
                        >
                          {" "}
                          {rq.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <section className=" mt-6  w-fit bg-clip-border rounded-xl bg-white text-gray-700 shadow-md ">
        <Calendar color="#4cc718" />
      </section>
    </Container>
  );
};

export default EmployeeHome;
