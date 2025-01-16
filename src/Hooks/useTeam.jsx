import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: team = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teams", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is undefined");
      }
      const { data } = await axiosSecure(`/team/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  return { team, isLoading, refetch };
};

export default useTeam;
