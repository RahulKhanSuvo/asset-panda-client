import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeCount from "../../../Hooks/useEmployeeCount";
import useTeam from "../../../Hooks/useTeam";
import MyEmployeeColum from "./MyEmployeeColum";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const { user } = useAuth();
  console.log(user.email);
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
            text: "please try again",
            icon: "error",
          });
          console.log(error);
        }
      }
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-[#DAE1F3] ">
        <h3>Members</h3>
        <div>
          <p>
            {" "}
            {teams.length} / {employeeCount.members}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
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
            {/* row 1 */}
            {teams.map((team, index) => (
              <MyEmployeeColum
                key={team._id}
                index={index}
                teams={team}
                handleDelete={handleDelete}
              ></MyEmployeeColum>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
