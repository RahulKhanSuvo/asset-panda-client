import { useState } from "react";
import Container from "../../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useUserStatus from "../../../Hooks/useUserStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RequestAssetsModal from "../../../Modal/RequestAssetsModal";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet-async";

const AssetsRequest = () => {
  const { userDetails } = useUserStatus();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "assistRequest",
      userDetails?.hrEmail,
      searchQuery,
      filterStatus,
    ],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assistRequest/${userDetails?.hrEmail}`,
        {
          params: {
            search: searchQuery,
            filterStatus,
          },
        }
      );
      return data;
    },
    enabled: !!userDetails?.hrEmail && !!localStorage.getItem("access-token"),
  });

  const handelRequest = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  // Pagination logic
  const totalAssets = assets ? assets.length : 0;
  const totalPages = Math.ceil(totalAssets / itemsPerPage);
  const currentAssets = assets
    ? assets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <Container>
      <Helmet>
        <title>Request Asset - AssetPanda</title>
        <meta
          name="description"
          content="Request an asset with AssetPanda. Fill out the necessary details and submit your request for asset allocation."
        />
        <meta
          name="keywords"
          content="Request Asset, Asset Allocation, AssetPanda, Request Form, Asset Management"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="mt-6 shadow-md rounded-md bg-white">
        <div className="">
          <div className="flex px-4 flex-col gap-4 md:flex-row py-2 border justify-between items-center">
            <div className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search by name..."
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <select
                onChange={(e) => setFilterStatus(e.target.value)}
                id="stockStatus"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Filter</option>
                <optgroup label="Stock Status">
                  <option value="available">Available</option>
                  <option value="out-of-stock">Out of Stock</option>
                </optgroup>
                <optgroup label="Asset Type">
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-Returnable</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <ImSpinner2 className="animate-spin text-indigo-500 text-4xl" />
            </div>
          ) : isError ? (
            <div className="text-center text-red-500 py-8">
              Error fetching assets. Please try again later.
            </div>
          ) : (
            <>
              <table className="table">
                {/* Table Head */}
                <thead>
                  <tr className="text-base uppercase">
                    <th>#</th>
                    <th>Name</th>
                    <th>Asset Type</th>
                    <th>Availability</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Body */}
                  {currentAssets && currentAssets.length > 0 ? (
                    currentAssets.map((asset, index) => (
                      <tr key={asset._id} className="hover text-base">
                        <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                        <td>{asset.name}</td>
                        <td className="capitalize">{asset.productType}</td>
                        <td>
                          <span
                            className={`text-[#2EC973] bg-[#DDF6E8] px-1 rounded-md ${
                              asset.quantity === 0
                                ? "text-red-600 bg-red-100"
                                : ""
                            }`}
                          >
                            {asset.quantity > 0 ? "Available" : "Out of stock"}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handelRequest(asset)}
                            disabled={asset?.quantity <= 0}
                            className="btn hover:bg-[#28A745] btn-sm text-white bg-[#34D399]"
                          >
                            Request
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No assets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <RequestAssetsModal
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}
                asset={selectedAsset}
              ></RequestAssetsModal>
            </>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && (
          <div className="flex justify-center border py-4 space-x-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 flex items-center gap-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#EFEEF0] hover:bg-[#E9E7FD]"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
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

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 flex items-center gap-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#EFEEF0] hover:bg-[#E9E7FD]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AssetsRequest;
