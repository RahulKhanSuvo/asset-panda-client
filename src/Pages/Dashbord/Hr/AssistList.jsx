import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Container from "../../../Components/Container";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { format } from "date-fns";
import { FiTrash2 } from "react-icons/fi";
import showToast from "../../../Components/ShowToast";
import AssetsUpdateModal from "../../../Modal/AssetsUpdateModal";
import Swal from "sweetalert2";

const AssistList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [updateId, setUpdateId] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const itemsPerPage = 10; // Number of items per page

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

  // Pagination Logic
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/deleteAsset/${id}`);
          showToast("Delete Successfully");
          refetch();
        } catch (error) {
          console.log(error);
          showToast(`${error.message}`, "error");
        }
      }
    });
  };

  // Handle edit
  const handleEdit = async (id) => {
    setUpdateId(id);
    setIsModalOpen(true);
  };

  // Calculate the assets to be displayed on the current page
  const paginatedAssets = assets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(assets.length / itemsPerPage);

  return (
    <Container>
      <div className="rounded-lg border-t bg-white mt-8">
        <div className="flex justify-between rounded-ss-xl border-x px-4 py-3 border-b items-center">
          {" "}
          <div className="flex flex-wrap gap-4 ">
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
          </div>
          <div className="">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search by name..."
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Sorting Section */}
          <div className="">
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

        <div className="bg-white rounded-md shadow-md">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th> Date </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAssets.map((asset, index) => (
                  <tr key={asset._id} className="hover">
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td>{asset.name}</td>
                    <td>{asset.productType}</td>
                    <td>{asset.quantity}</td>
                    <td>
                      {asset?.timestamp &&
                        format(new Date(asset?.timestamp), "yyyy-MM-dd")}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(asset._id)}
                        className="text-[#6474E2] mr-4"
                      >
                        <FaRegEdit size={20} />
                      </button>
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-l-md"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
          >
            Next
          </button>
        </div>

        <AssetsUpdateModal
          refetch={refetch}
          isOpen={isModalOpen}
          updateId={updateId}
          setIsModalOpen={setIsModalOpen}
        ></AssetsUpdateModal>
      </div>
    </Container>
  );
};

export default AssistList;
