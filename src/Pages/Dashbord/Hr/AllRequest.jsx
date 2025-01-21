import Container from "../../../Components/Container";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import showToast from "../../../Components/ShowToast";

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: requests = [],
    isLoading,
    isError,
    refetch,
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

  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/hr/approveRequest/${id}`);
      showToast("Request Approved Successfully");
      refetch();
    } catch (error) {
      console.log(error);
      showToast(`${error.message}`, "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/hr/rejectRequest/${id}`);
      showToast("Request Rejected Successfully");
      refetch();
    } catch (error) {
      console.log(error);
      showToast(`${error.message}`, "error");
    }
  };

  // Calculate the requests for the current page
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      {/* Search Bar */}

      <div className="mt-8 rounded-md shadow-md bg-white">
        <div className="py-4 border-t border-b px-4 ">
          <div className="flex max-w-sm mx-auto  items-center border border-gray-300 rounded-md shadow-sm p-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by name, email, or asset..."
              className="flex-1 outline-none"
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        {/* Table view for large screens */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="table-auto w-full table  border-gray-300">
              <thead className="">
                <tr className="text-base uppercase">
                  <th>#</th>
                  <th>Asset Name</th>
                  <th>Asset Type</th>
                  <th>Requester Email</th>
                  <th>Requester Name</th>
                  <th>Request Date</th>
                  <th>Additional Note</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests?.length > 0 ? (
                  paginatedRequests.map((request, index) => (
                    <tr key={request._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="capitalize">{request.assetName}</td>
                      <td className="capitalize">{request.assetType}</td>
                      <td>{request.reqEmail}</td>
                      <td>{request.reqName}</td>
                      <td>
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td>{request.notes || "N/A"}</td>
                      <td>{request.status}</td>
                      <td className=" flex space-x-2 justify-center">
                        <button
                          disabled={
                            request.status === "approved" ||
                            request.status === "rejected" ||
                            request.status === "returned"
                          }
                          onClick={() => handleApprove(request._id)}
                          className="btn btn-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          disabled={
                            request.status === "approved" ||
                            request.status === "rejected" ||
                            request.status === "returned"
                          }
                          onClick={() => handleReject(request._id)}
                          className=" btn btn-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
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
          {paginatedRequests?.length > 0 ? (
            paginatedRequests.map((request) => (
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
                  <button
                    disabled={
                      request.status === "approved" ||
                      request.status === "rejected"
                    }
                    onClick={() => handleApprove(request._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    disabled={
                      request.status === "approved" ||
                      request.status === "rejected"
                    }
                    onClick={() => handleReject(request._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No requests found.</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end px-4 items-center py-3 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-1 py-1 disabled:cursor-not-allowed  bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-1 py-1 disabled:cursor-not-allowed  bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AllRequest;
