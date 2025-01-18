import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useUserStatus from "../Hooks/useUserStatus";
import Payment from "../Pages/Payment/Payment";

const HrRouter = ({ children }) => {
  const { userDetails, isLoading } = useUserStatus();
  console.log(userDetails);
  if (isLoading) return <LoadingSpinner />;
  if (userDetails?.paymentStatus === "pending")
    return <Navigate to={"/payment"}></Navigate>;
  if (userDetails?.role === "hr") return children;
  return <Navigate to="/"></Navigate>;
};

export default HrRouter;
