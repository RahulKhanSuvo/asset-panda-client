import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useEmployeeCount = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: employeeCount,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employeeCount", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/employeeCount/${user?.email}`);
      return data;
    },
  });
  return { employeeCount, isLoading, refetch };
};

export default useEmployeeCount;
