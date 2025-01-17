import { useState } from "react";
import Container from "../../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useUserStatus from "../../../Hooks/useUserStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RequestAssetsModal from "../../../Modal/RequestAssetsModal";

const AssetsRequest = () => {
  const { userDetails } = useUserStatus();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
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
    enabled: !!userDetails?.hrEmail,
  });

  const handelRequest = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };
  console.log(assets);
  return (
    <Container>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <div className="mb-4">
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
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Asset Type</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Body */}
            {assets && assets.length > 0 ? (
              assets.map((asset, index) => (
                <tr key={asset._id}>
                  <th>{index + 1}</th>
                  <td>{asset.name}</td>
                  <td>{asset.productType}</td>
                  <td>{asset.quantity > 0 ? "Available" : "Out of stock"}</td>
                  <td>
                    <button
                      onClick={() => handelRequest(asset)}
                      disabled={asset?.quantity <= 0}
                      className="btn"
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
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
      </div>
    </Container>
  );
};

export default AssetsRequest;
