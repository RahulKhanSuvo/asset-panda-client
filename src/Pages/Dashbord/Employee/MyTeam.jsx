import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container";
import useUserStatus from "../../../Hooks/useUserStatus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Header */}
          <thead>
            <tr>
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
                <th>{index + 1}</th>
                <th>
                  <img className="size-10" src={member?.memberImage} alt="" />
                </th>
                <th>{member?.memberName}</th>
                <th>{member.memberEmail}</th>
                <th>{member?.memberRole}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyTeam;
