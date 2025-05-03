import { useQuery } from "@tanstack/react-query";

import Activity from "./HrHomeCom/Activity";
import HrPie from "./HrHomeCom/HrPie";
import HrTopRequested from "./HrHomeCom/HrTopRequested";
import LimitedAssets from "./HrHomeCom/LimitedAssets";
import PendingRequests from "./HrHomeCom/PendingRequests";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import HRBarChart from "../../../Components/HRBarChart";
import { Helmet } from "react-helmet-async";
const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: activity = {}, isLoading } = useQuery({
    queryKey: ["activity", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/activity/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner smallHeight></LoadingSpinner>;

  return (
    <section className="px-4">
      <Helmet>
        <title>HR Home - AssetPanda</title>
        <meta
          name="description"
          content="Manage your team and assets effectively as an HR on AssetPanda. View employee performance and track asset requests."
        />
        <meta
          name="keywords"
          content="HR Home, HR Dashboard, Team Management, Asset Management, AssetPanda"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.assetpanda.com/hr-home" />
      </Helmet>
      <div>
        <h3 className="font-bold text-2xl"> Hi, Welcome Back</h3>
      </div>
      <Activity activity={activity}></Activity>
      <div className=" grid grid-cols-1    lg:grid-cols-3 mt-6 justify-between gap-6">
        <PendingRequests></PendingRequests>
        <HrTopRequested></HrTopRequested>
        <LimitedAssets></LimitedAssets>
      </div>
      <div className="flex flex-col pb-16 justify-between gap-6 mt-6 lg:flex-row items-center">
        <div className="w-full lg:w-1/2 ">
          <HrPie />
        </div>
        <div className="w-full lg:w-1/2">
          <HRBarChart activity={activity} />
        </div>
      </div>
    </section>
  );
};

export default HrHome;
