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
const AddEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const { user } = useAuth();
  const { team, refetch: refetchTeam } = useTeam();
  console.log("team", team);
  const {
    employeeCount,
    isLoading: isCountLoading,
    refetch,
  } = useEmployeeCount();
  console.log(employeeCount);
  const navigate = useNavigate();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching employees: {error.message}</div>;
  }

  // Handle checkbox selection
  const handleCheckboxChange = (employeeId) => {
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
      const { data } = await axiosSecure.post("/addTeam", {
        ...addTeamData,
        memberId: employeeData._id,
        memberName: employeeData.name,
        memberRole: employeeData.role,
        memberEmail: employeeData.email,
        memberImage: employeeData.image,
      });
      employeeRefetch();
      refetchTeam();

      // Success alert
      Swal.fire({
        icon: "success",
        toast: true,
        title: "Success",
        text: `${employeeData.name} has been added to the team.`,
      });
    } catch (error) {
      console.log(error);

      // Error alert
      Swal.fire({
        icon: "error",
        toast: true,
        title: "Error",
        text: "Failed to add the member. Please try again later.",
      });
    }
  };

  // Handle increasing package limit
  const handleIncreaseLimit = () => {
    navigate("/packages");
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#F80136]">
          Manage Employees
        </h1>

        {/* Package Section */}
        <div className="p-4 border rounded-md bg-gray-50 mb-8">
          <h2 className="text-xl font-semibold mb-2">Package Information</h2>
          <p>
            <strong>Current Team Members:</strong> {team.length}
          </p>
          <p>
            <strong>Team Limit:</strong> {employeeCount?.members || 0}
          </p>
          <button
            onClick={handleIncreaseLimit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Increase Limit
          </button>
        </div>

        {/* Free Employee List Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Employees</h2>
          {employees.length === 0 ? (
            <p>No free employees available.</p>
          ) : (
            <div className="space-y-4">
              {employees.map((employee) => (
                <div
                  key={employee._id}
                  className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
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
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add to Team
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Selected Members Button */}
        {/* {selectedEmployees.length > 0 && (
          <button
            onClick={handleAddToTeam}
            className="mt-6 w-full py-2 bg-[#F80136] text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
          >
            Add Selected Members to the Team
          </button>
        )} */}
      </div>
    </Container>
  );
};

export default AddEmployee;
