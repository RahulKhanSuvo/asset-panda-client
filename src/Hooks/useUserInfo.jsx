import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: userInfo = [], isLoading } = useQuery({
    queryKey: ["employeeInfo", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data;
    },
  });
  return { userInfo, isLoading };
};

export default useUserInfo;
