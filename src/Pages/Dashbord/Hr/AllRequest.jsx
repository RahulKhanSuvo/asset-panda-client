import Container from "../../../Components/Container";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allRequestOne", search, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/hr/allRequest/${user?.email}`, {
        params: {
          search,
        },
      });
      return data;
    },
    enabled: !!user?.email,
  });

  return (
    <Container>
      {/* Search Bar */}
      <div className="flex max-w-xl mx-auto mt-4 items-center border border-gray-300 rounded-md shadow-sm p-2">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by name, email, or asset..."
          className="flex-1 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Requests Display */}
      <div className="mt-4">
        {/* Table view for large screens */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Asset Name</th>
                  <th className="px-4 py-2 border">Asset Type</th>
                  <th className="px-4 py-2 border">Requester Email</th>
                  <th className="px-4 py-2 border">Requester Name</th>
                  <th className="px-4 py-2 border">Request Date</th>
                  <th className="px-4 py-2 border">Additional Note</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests?.length > 0 ? (
                  requests.map((request, index) => (
                    <tr key={request._id}>
                      <td className="px-4 py-2 border text-center">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border">{request.assetName}</td>
                      <td className="px-4 py-2 border">{request.assetType}</td>
                      <td className="px-4 py-2 border">{request.reqEmail}</td>
                      <td className="px-4 py-2 border">{request.reqName}</td>
                      <td className="px-4 py-2 border">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border">
                        {request.notes || "N/A"}
                      </td>
                      <td className="px-4 py-2 border">{request.status}</td>
                      <td className="px-4 py-2 border flex space-x-2 justify-center">
                        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card view for small screens */}
        <div className="md:hidden">
          {requests?.length > 0 ? (
            requests.map((request, index) => (
              <div
                key={request._id}
                className="bg-white p-4 shadow-md rounded-md mb-4"
              >
                <h3 className="text-xl font-semibold">{request.assetName}</h3>
                <p className="text-gray-500">{request.assetType}</p>
                <p className="text-sm">Requested by: {request.reqName}</p>
                <p className="text-sm">Email: {request.reqEmail}</p>
                <p className="text-sm">
                  Request Date:{" "}
                  {new Date(request.requestDate).toLocaleDateString()}
                </p>
                <p className="text-sm">Status: {request.status}</p>
                <p className="text-sm mt-2">Notes: {request.notes || "N/A"}</p>
                <div className="mt-4 flex space-x-2 justify-end">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No requests found.</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllRequest;
