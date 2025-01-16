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
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is undefined");
      }
      const { data } = await axiosSecure(`/payment/status/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  return [paymentStatus, isLoading, refetch];
};

export default usePayment;
