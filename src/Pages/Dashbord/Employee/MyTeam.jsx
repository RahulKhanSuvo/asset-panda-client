import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container";
import useUserStatus from "../../../Hooks/useUserStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { MdRememberMe } from "react-icons/md";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing icons

const MyTeam = () => {
  const { userDetails } = useUserStatus();
  const axiosSecure = useAxiosSecure();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myTeam", userDetails?.hrEmail],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/myTeamMember/${userDetails.hrEmail}`
      );
      return data;
    },
    enabled: !!userDetails?.hrEmail,
  });

  if (isLoading) {
    return <LoadingSpinner smallHeight></LoadingSpinner>;
  }

  if (error) {
    return (
      <Container>
        <p>Error: {error.message}</p>
      </Container>
    );
  }

  if (!members || members.length === 0) {
    return (
      <Container>
        <p>No team members found.</p>
      </Container>
    );
  }

  // Calculate pagination details
  const totalMembers = members.length;
  const totalPages = Math.ceil(totalMembers / itemsPerPage);
  const currentItems = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className="shadow-md rounded-md bg-white">
        <div className="overflow-x-auto  mt-8 ">
          <table className="table">
            {/* Table Header */}
            <thead>
              <tr className="text-base uppercase">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Mail</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((member, index) => (
                <tr className="text-base" key={member._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <img className="size-10" src={member?.memberImage} alt="" />
                  </td>
                  <td>{member?.memberName}</td>
                  <td>{member.memberEmail}</td>
                  <td>
                    {member?.memberRole === "employee" ? (
                      <p className="flex items-center">
                        <MdRememberMe />
                        employee
                      </p>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end px-4 border py-4 space-x-2">
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
            <FaArrowLeft /> Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNumber
                    ? "bg-[#7367F0] text-white shadow-sm shadow-[#7367F0]"
                    : "bg-[#EFEEF0] hover:bg-[#E9E7FD]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 flex  items-center gap-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#EFEEF0] hover:bg-[#E9E7FD]"
            }`}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MyTeam;
