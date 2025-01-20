import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Container from "../../../Components/Container";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import useUserStatus from "../../../Hooks/useUserStatus";
import PrintableAsset from "../../../Components/PrintableAsset";
import { PDFDownloadLink } from "@react-pdf/renderer";
import showToast from "../../../Components/ShowToast";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaPrint } from "react-icons/fa";
const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userDetails } = useUserStatus();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myAssets", user?.email, searchQuery, statusFilter],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/employee/assetsList/${user?.email}`,
        {
          params: {
            search: searchQuery,
            filter: statusFilter,
          },
        }
      );
      return data;
    },
  });

  // Pagination Logic
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const paginatedAssets = assets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handelCancel = async (asset) => {
    try {
      const response = await axiosSecure.patch(
        `/employee/assetsCancel/${asset._id}`,
        {
          assetId: asset.assetId,
        }
      );
      if (response.status === 200) {
        showToast("Asset cancelled successfully"); // Updated message
        refetch(); // Refresh data after cancellation
      } else {
        showToast("Failed to cancel the asset", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(`${error.response?.data?.message || error.message}`, "error");
    }
  };

  const handelReturn = async (asset) => {
    try {
      const { data } = await axiosSecure.patch(
        `/employee/returnAsset/${asset._id}`,
        {
          assetId: asset.assetId,
        }
      );
      console.log(data);
      showToast("Asset Returned Successfully");
      refetch();
    } catch (error) {
      console.log(error);
      showToast(`${error.message}`, "error");
    }
  };

  return (
    <Container>
      <div className="bg-white rounded-md shadow-md mt-8">
        <div className="flex border-t py-3 justify-between px-4">
          <div className="flex items-center relative border-gray-300 rounded-md shadow-sm ">
            <FaSearch className="text-gray-500 absolute left-1" />
            <input
              type="text"
              placeholder="Search by name..."
              className="px-6 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8]  focus:shadow-md focus:shadow-[#685DD8]"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              id="stockStatus"
              className="px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
            >
              <option value="all">Filter</option>
              <optgroup label="Stock Status">
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </optgroup>
              <optgroup label="Asset Type">
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </optgroup>
            </select>
          </div>
        </div>
        {/* Display Filtered Items */}
        <div className="overflow-x-auto border-t">
          {paginatedAssets.length > 0 ? (
            <>
              <table className="table-auto table w-full  ">
                <thead>
                  <tr className="uppercase  text-base">
                    <th>#</th>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Request Date</th>
                    <th>Approval Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="border-b text-base">
                  {paginatedAssets.map((asset, index) => (
                    <tr key={index} className="hover">
                      <td>{index + 1}</td>
                      <td>{asset.assetName}</td>
                      <td>{asset.assetType}</td>
                      <td>
                        {format(
                          new Date(asset.requestDate),
                          "MMM dd, yyyy, H:mm"
                        )}
                      </td>
                      <td>
                        {asset?.approvalDate &&
                          format(
                            new Date(asset.approvalDate),
                            "MMM dd, yyyy, H:mm"
                          )}
                      </td>
                      <td>
                        <span
                          className={`${
                            asset.status === "pending"
                              ? "text-[#FF9F43] bg-[#FFF0E1]"
                              : asset.status === "approved"
                              ? "text-[#28C76F] bg-[#DDF6E8]"
                              : asset.status === "cancel"
                              ? "text-[#FF4C51] bg-[#FFE2E3]"
                              : "text-[#3498DB] bg-[#D6F4F8]"
                          } px-2 rounded-md py-1 capitalize`}
                        >
                          {" "}
                          {asset.status}
                        </span>
                      </td>
                      <td className="flex gap-1">
                        <button
                          disabled={asset.status !== "pending"}
                          onClick={() => handelCancel(asset)}
                          className="btn text-white bg-[#FF4C51] hover:bg-[#e03c3c] btn-sm"
                        >
                          Cancel
                        </button>
                        {(asset.status === "approved" &&
                          asset.assetType === "returnable") ||
                        asset.status === "returned" ? (
                          <>
                            <button
                              disabled={asset.status === "returned"}
                              onClick={() => handelReturn(asset)}
                              className="btn text-white bg-[#28C76F] hover:bg-[#1d9c58] btn-sm"
                            >
                              Return
                            </button>
                          </>
                        ) : null}
                        {(asset.status === "approved" ||
                          asset.status === "returned") && (
                          <PDFDownloadLink
                            document={
                              <PrintableAsset
                                asset={asset}
                                companyInfo={userDetails}
                              />
                            }
                            fileName={`${asset.assetName}_Details.pdf`}
                          >
                            {({ loading }) =>
                              loading ? (
                                <button
                                  className="btn btn-sm bg-[#3498DB] hover:bg-[#2980B9] text-white"
                                  disabled
                                >
                                  <ImSpinner2 className="animate-spin" />
                                </button>
                              ) : (
                                <button className="btn btn-sm bg-[#3498DB] hover:bg-[#2980B9] text-white">
                                  <FaPrint />
                                </button>
                              )
                            }
                          </PDFDownloadLink>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-end px-4 items-center py-4 gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-1 py-1 disabled:cursor-not-allowed  bg-gray-300 rounded hover:bg-gray-400"
                >
                  <GrFormPrevious size={24} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-[#7367F0] text-white shadow-sm shadow-[#7367F0]"
                        : "bg-[#EFEEF0] hover:bg-[#E9E7FD]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-1 disabled:cursor-not-allowed py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  <MdNavigateNext size={24} />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No assets found.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyAssets;
