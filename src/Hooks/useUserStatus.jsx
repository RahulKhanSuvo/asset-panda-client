import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserStatus = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: userDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userStatus", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/userStatus/${user?.email}`);
      return data;
    },
  });
  return { userDetails, isLoading, isError, refetch };
};

export default useUserStatus;
