import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const HrTopRequested = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["topRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/mostRequested/${user?.email}`);
      return data;
    },
  });
  //   console.log(data);
  return <></>;
};

export default HrTopRequested;
