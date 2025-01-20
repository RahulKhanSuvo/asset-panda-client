import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container";
import Activity from "./HrHomeCom/Activity";
import HrPie from "./HrHomeCom/HrPie";
import HrTopRequested from "./HrHomeCom/HrTopRequested";
import LimitedAssets from "./HrHomeCom/LimitedAssets";
import PendingRequests from "./HrHomeCom/PendingRequests";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: activity = {}, isLoading } = useQuery({
    queryKey: ["activity", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/activity/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner smallHeight></LoadingSpinner>;
  return (
    <Container>
      <Activity activity={activity}></Activity>
      <div className=" grid grid-cols-1   lg:grid-cols-3 mt-6 justify-between gap-6">
        <PendingRequests></PendingRequests>
        <HrTopRequested></HrTopRequested>
        <LimitedAssets></LimitedAssets>
      </div>
      <div>
        <HrPie></HrPie>
      </div>
    </Container>
  );
};

export default HrHome;
