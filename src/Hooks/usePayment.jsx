import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: paymentStatus = [], isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/payment/status/${user?.email}`);
      return data;
    },
  });
  return [paymentStatus, isLoading];
};

export default usePayment;
