import { useState } from "react";
import Container from "../../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useUserStatus from "../../../Hooks/useUserStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssetsRequest = () => {
  const { userDetails } = useUserStatus();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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

  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p className="text-center text-red-500">Failed to fetch assets.</p>
      </Container>
    );
  }
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
                    <button disabled={asset?.quantity <= 0} className="btn">
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
      </div>
    </Container>
  );
};

export default AssetsRequest;
