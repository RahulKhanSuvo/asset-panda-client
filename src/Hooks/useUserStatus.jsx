import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userStatusOn", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/userStatus/${user?.email}`);
      return data;
    },
  });

  return { userDetails, isLoading, isError, refetch };
};

export default useUserStatus;
