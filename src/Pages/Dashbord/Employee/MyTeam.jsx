import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container";
import useUserStatus from "../../../Hooks/useUserStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { MdRememberMe } from "react-icons/md";
const MyTeam = () => {
  const { userDetails } = useUserStatus();
  const axiosSecure = useAxiosSecure();
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
  console.log(members);
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

  return (
    <Container>
      <div className="overflow-x-auto bg-white mt-8 rounded-md shadow-md">
        <table className="table">
          {/* Table Header */}
          <thead>
            <tr className="text-base">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>
                  <img className="size-10" src={member?.memberImage} alt="" />
                </td>
                <td>{member?.memberName}</td>
                <td>{member.memberEmail}</td>
                <td>
                  {member?.memberRole === "employee" ? (
                    <>
                      {" "}
                      <p className="flex items-center">
                        <MdRememberMe />
                        employee
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyTeam;
