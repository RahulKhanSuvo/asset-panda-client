import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUserStatus from "../../Hooks/useUserStatus";
import About from "./About";
import Banner from "./Banner";
import Packages from "./Packages";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import What from "./What";
import Smart from "./Smart";
import Mange from "./Mange";
import ExpertsSection from "./ExpertsSection";
import Team from "./Team";
import Save from "./Save";
import TestimonialSlider from "./TestimonialSlider";
import FeaturesSection from "./FeaturesSection";
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
    <>
      <Helmet>
        <title>AssetPanda - Home</title>
        <meta
          name="description"
          content="Welcome to AssetPanda, your asset management solution!"
        />
        <meta
          name="keywords"
          content="asset management, software, AssetPanda"
        />
        <meta name="author" content="AssetPanda Team" />
        <meta property="og:title" content="AssetPanda - Home" />
        <meta
          property="og:description"
          content="Manage your assets with AssetPanda easily!"
        />
      </Helmet>
      <Banner />
      <section className="bg-[#FFFFFF]">
        <What />
      </section>
      <Smart />
      <Mange />
      <ExpertsSection />
      <Team />
      <Save />
      <TestimonialSlider />
      <About />
      <FeaturesSection />
      <Packages />
    </>
  );
};

export default Home;
