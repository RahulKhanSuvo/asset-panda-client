import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEmployeeCount = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: employeeCount,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employeeCount", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employeeCount/${user?.email}`);
      return data;
    },
  });
  return { employeeCount, isLoading, refetch };
};

export default useEmployeeCount;
