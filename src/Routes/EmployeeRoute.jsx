import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useUserStatus from "../Hooks/useUserStatus";
import MessageComponent from "../Components/MessageComponent";

const EmployeeRoute = ({ children }) => {
  const { userDetails, isLoading } = useUserStatus();
  console.log(userDetails);
  if (isLoading) return <LoadingSpinner />;
  if (!userDetails?.hrEmail) {
    return <MessageComponent></MessageComponent>;
  }
  if (userDetails?.role === "employee") return children;

  return <Navigate to="/"></Navigate>;
};
export default EmployeeRoute;
