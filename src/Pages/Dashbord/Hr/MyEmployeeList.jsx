import useTeam from "../../../Hooks/useTeam";
import MyEmployeeColum from "./MyEmployeeColum";

const MyEmployeeList = () => {
  const { team: teams, isLoading, refetch } = useTeam();
  console.log(teams);
  const handleDelete = async (id) => {
    console.log(id);
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#DAE1F3]">
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
