import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeCount from "../../../Hooks/useEmployeeCount";
import useUserInfo from "../../../Hooks/useUserInfo";
import useTeam from "../../../Hooks/useTeam";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AddEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const { user } = useAuth();
  const { team, refetch: refetchTeam } = useTeam();
  const {
    employeeCount,
    isLoading: isCountLoading,
    refetch: refetchCount,
  } = useEmployeeCount();
  const navigate = useNavigate();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const employeesPerPage = 5; // Number of employees per page

  // Fetch free employees
  const {
    data: employees = [],
    isLoading,
    error,
    refetch: employeeRefetch,
  } = useQuery({
    queryKey: ["freeUser", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/freeEmployee");
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || isCountLoading) {
    return <LoadingSpinner smallHeight></LoadingSpinner>;
  }

  if (error) {
    return <div>Error fetching employees: {error.message}</div>;
  }

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (employeeId) => {
    if (selectedEmployees.length >= employeeCount?.members) {
      return;
    }
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const addTeamData = {
    companyName: userInfo.companyName,
    companyLogo: userInfo.companyLogo,
    hrEmail: userInfo.email,
  };

  // Add selected members to the team
  const handleAddToTeam = async (employeeData) => {
    if (team.length >= employeeCount?.members) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Limit Exceeded",
        text: "Adding this member exceeds your team limit. Increase your limit.",
      });
      return;
    }

    try {
      // Add employee to the team
      await axiosSecure.post("/addTeam", {
        ...addTeamData,
        memberId: employeeData._id,
        memberName: employeeData.name,
        memberRole: employeeData.role,
        memberEmail: employeeData.email,
        memberImage: employeeData.image,
      });
      employeeRefetch();
      refetchTeam();
      refetchCount();
      Swal.fire({
        icon: "success",
        toast: true,
        title: "Success",
        text: `${employeeData.name} has been added to the team.`,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        toast: true,
        title: "Error",
        text: "Failed to add the member. Please try again later.",
      });
    }
  };

  const handleAddSelectedToTeam = async () => {
    if (team.length >= employeeCount?.members) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Limit Exceeded",
        text: "Adding this member exceeds your team limit. Increase your limit.",
      });
      return;
    }

    try {
      const selectedEmployeeData = employees
        .filter((employee) => selectedEmployees.includes(employee._id))
        .map((employee) => ({
          ...addTeamData,
          memberId: employee._id,
          memberName: employee.name,
          memberRole: employee.role,
          memberEmail: employee.email,
          memberImage: employee.image,
        }));

      await axiosSecure.post("/addSelectedTeam", selectedEmployeeData);
      employeeRefetch();
      refetchTeam();
      refetchCount();
      setSelectedEmployees([]);
      Swal.fire({
        icon: "success",
        toast: true,
        title: "Success",
        text: "Selected employees have been added to the team.",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        toast: true,
        title: "Error",
        text: "Failed to add the selected employees. Please try again later.",
      });
    }
  };

  const handleIncreaseLimit = () => {
    navigate("/packages");
  };

  return (
    <Container>
      <div className="mx-auto max-w-4xl bg-white border shadow-md mt-8">
        {/* Package Section */}
        <div className="p-4 flex justify-between items-center border bg-gray-50 mb-8">
          <div>
            <p>
              <strong>Current Team Members:</strong> {team.length}
            </p>
            <p>
              <strong>Team Limit:</strong> {employeeCount?.members || 0}
            </p>
          </div>
          <button
            onClick={handleIncreaseLimit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md shadow-blue-500 hover:bg-blue-700 transition-colors"
          >
            Increase Limit
          </button>
        </div>

        {/* Free Employee List Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 px-4">
            Available Employees
          </h2>
          {currentEmployees.length === 0 ? (
            <p>No free employees available.</p>
          ) : (
            <div className="space-y-4">
              {currentEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="flex items-center justify-between p-4 border  bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee._id)}
                      onChange={() => handleCheckboxChange(employee._id)}
                      className="h-4 w-4"
                    />
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <p>{employee.name}</p>
                  </div>
                  <button
                    onClick={() => handleAddToTeam(employee)}
                    className="px-4 py-2  bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add to Team
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-center ">
          {selectedEmployees.length > 0 && (
            <button
              onClick={handleAddSelectedToTeam}
              className=" py-2 btn btn-sm bg-[#F80136] my-2 text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              Add Selected Members to the Team
            </button>
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-end border items-center gap-2 px-4 py-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300  btn-sm btn cursor-not-allowed"
                : "bg-blue-600  btn-sm btn text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300  btn-sm btn cursor-not-allowed"
                : "bg-blue-600  btn-sm btn text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AddEmployee;
