import About from "./About";
import Banner from "./Banner";
import Packages from "./Packages";

const Home = () => {
  return (
    <div className="lg:container mx-auto">
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
    </div>
  );
};

export default Home;
