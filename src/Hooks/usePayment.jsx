import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: paymentStatus = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/payment/status/${user.email}`);
      return data;
    },
  });

  return [paymentStatus, isLoading, refetch];
};

export default usePayment;
