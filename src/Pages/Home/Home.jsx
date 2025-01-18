import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUserStatus from "../../Hooks/useUserStatus";
import About from "./About";
import Banner from "./Banner";
import Packages from "./Packages";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { userDetails, isLoading } = useUserStatus();
  useEffect(() => {
    if (!loading && !isLoading && user) {
      if (userDetails?.role === "hr") {
        navigate("/hrHome");
      } else if (userDetails?.role === "employee") {
        navigate("/employeeHome");
      }
    }
  }, [loading, isLoading, user, userDetails, navigate]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="lg:container mx-auto">
      <Banner />
      <About />
      <Packages />
    </div>
  );
};

export default Home;
