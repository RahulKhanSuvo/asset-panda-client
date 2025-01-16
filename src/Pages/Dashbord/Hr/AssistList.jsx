import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Container from "../../../Components/Container";
import { useState } from "react";
import { format } from "date-fns";
import { FiTrash2 } from "react-icons/fi";
import showToast from "../../../Components/ShowToast";
const AssistList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [sortOrder, setSortOrder] = useState("default");
  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assetsList", user?.email, searchQuery, filterStatus, sortOrder],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allAssets/${user?.email}`, {
        params: {
          search: searchQuery,
          filterStatus,
          sortOrder,
        },
      });
      return data;
    },
  });
  // delete
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/deleteAsset/${id}`);
      showToast("Delete Successfully");
      refetch();
    } catch (error) {
      console.log(error);
      showToast(`${error.message}`, "error");
    }
  };
  return (
    <Container>
      <div className="rounded-lg bg-[#DAE1F3] p-6">
        {/* Search Section */}
        <div className="flex justify-between items-center">
          {" "}
          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Stock Status Filter */}
            <div>
              <select
                onChange={(e) => setFilterStatus(e.target.value)}
                id="stockStatus"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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

            {/* Asset Type Filter */}
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search by name..."
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Sorting Section */}
          <div className="mb-4">
            <select
              id="sortQuantity"
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="default">Sort by Quantity</option>
              <option value="asc">Quantity: Low to High</option>
              <option value="desc">Quantity: High to Low</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow-md">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-200">
                  <th></th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th> Date </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <tr key={asset._id} className="">
                    <th>{index + 1}</th>
                    <td>{asset.name}</td>
                    <td>{asset.productType}</td>
                    <td>{asset.quantity}</td>
                    <td>
                      {asset?.timestamp &&
                        format(new Date(asset?.timestamp), "yyyy-MM-dd")}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className=" text-[#F05206]"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AssistList;
