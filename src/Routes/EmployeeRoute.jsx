import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useUserStatus from "../Hooks/useUserStatus";

const EmployeeRoute = ({ children }) => {
  const { userDetails, isLoading } = useUserStatus();

  if (isLoading) return <LoadingSpinner />;
  if (userDetails?.role === "employee") return children;
  return <Navigate to="/"></Navigate>;
};

export default EmployeeRoute;
