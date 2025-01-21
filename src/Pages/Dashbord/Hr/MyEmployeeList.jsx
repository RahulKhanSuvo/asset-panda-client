import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import Container from "../../../Components/Container";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeCount from "../../../Hooks/useEmployeeCount";
import useTeam from "../../../Hooks/useTeam";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";

const MyEmployeeList = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 5; // Items per page

  if (loading) {
    return <h3>Loading</h3>;
  }

  const axiosSecure = useAxiosSecure();
  const { team: teams, isLoading, refetch } = useTeam();
  const { employeeCount, refetch: countRefetch } = useEmployeeCount();

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
          const { data } = await axiosSecure.delete(
            `/memberDelete/${id}?hrEmail=${user?.email}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          console.log(data);
          countRefetch();
          refetch();
        } catch (error) {
          Swal.fire({
            title: "Failed!",
            text: "Please try again",
            icon: "error",
          });
          console.log(error);
        }
      }
    });
  };

  // Pagination Logic
  const totalItems = teams.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = teams.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="mt-8 bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center px-4 py-2">
          <h3>Members</h3>
          <div>
            <p>
              {teams.length} / {employeeCount?.members}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-t">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Mail</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((team, index) => (
                <tr key={team._id} className="hover">
                  <th>{startIndex + index + 1}</th>
                  <td>
                    <div>
                      <img className="size-10" src={team.memberImage} alt="" />
                    </div>
                  </td>
                  <td>{team.memberName}</td>
                  <td>
                    <IoMailOutline
                      size={20}
                      className="text-[#F35449] inline"
                    />{" "}
                    <p className="inline">{team.memberEmail}</p>
                  </td>
                  <td>{team.memberRole}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(team.memberId)}
                      className="text-[#F05206]"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center py-4 gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-[#7367F0] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MyEmployeeList;
