import Container from "../../../Components/Container";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import showToast from "../../../Components/ShowToast";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet-async";

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
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
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
      showToast(`${error.message}`, "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/hr/rejectRequest/${id}`);
      showToast("Request Rejected Successfully");
      refetch();
    } catch (error) {
      showToast(`${error.message}`, "error");
    }
  };

  // Calculate the requests for the current page
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="px-4">
      <Helmet>
        <title>All Requests - AssetPanda</title>
        <meta
          name="description"
          content="View all asset requests from employees and manage them efficiently on AssetPanda."
        />
        <meta
          name="keywords"
          content="Asset Requests, Manage Requests, All Requests, Employee Requests, AssetPanda"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

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

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <ImSpinner2 className="animate-spin text-2xl text-[#7367F0]" />
            <p className="ml-2 text-lg text-gray-500">Loading assets...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-4 text-red-500">
            Error fetching data.
          </div>
        ) : (
          <>
            {/* Table view for large screens */}
            <div className="">
              <div className="overflow-x-auto">
                <table className="table-auto w-full table border-gray-300">
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
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="capitalize">{request.assetName}</td>
                          <td className="capitalize">{request.assetType}</td>
                          <td>{request.reqEmail}</td>
                          <td>{request.reqName}</td>
                          <td>
                            {new Date(request.requestDate).toLocaleDateString()}
                          </td>
                          <td>{request.notes || "N/A"}</td>
                          <td>
                            <span
                              className={`${
                                request.status === "pending"
                                  ? "text-[#FF9F43] bg-[#FFF0E1]"
                                  : request.status === "approved"
                                  ? "text-[#28C76F] bg-[#DDF6E8]"
                                  : "text-[#db3434] bg-[#FFE2E3]"
                              } px-2 rounded-md py-1 capitalize`}
                            >
                              {request.status}
                            </span>
                          </td>
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
          </>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-end px-4 items-center py-3 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-1 py-1 disabled:cursor-not-allowed  btn btn-sm bg-[#7367F0] text-white rounded hover:bg-[#685DD8]"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-1 py-1 disabled:cursor-not-allowed  btn btn-sm bg-[#7367F0] text-white rounded hover:bg-[#685DD8]"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllRequest;
