import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowSpinner(true), 4000);
      return () => clearTimeout(timer);
    }
    setShowSpinner(false);
  }, [loading]);
  console.log(showSpinner);
  if (showSpinner) return <LoadingSpinner />;
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location.pathname }}></Navigate>;
};

export default PrivateRouter;
