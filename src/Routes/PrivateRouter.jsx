import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../Hooks/useAuth";
const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location.pathname }}></Navigate>;
};

export default PrivateRouter;
