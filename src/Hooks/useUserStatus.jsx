import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserStatus = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosPublic = useAxiosPublic();
  const { data: userDetails } = useQuery({
    queryKey: ["userStatus", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/userStatus/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  return { userDetails };
};

export default useUserStatus;
