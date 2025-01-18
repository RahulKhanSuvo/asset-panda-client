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
  if (isLoading || loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    if (userDetails?.role === "hr") {
      return navigate("/hrHome");
    } else if (userDetails?.role === "employee") {
      return navigate("/employeeHome");
    }
  }

  return (
    <div className="lg:container mx-auto">
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
    </div>
  );
};

export default Home;
