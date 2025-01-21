import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
  return (
    <>
      <div className="bg-[#F5F4F7]">
        <div className="sticky top-0 z-20">
          <NavBar></NavBar>
        </div>
        <div className="min-h-[calc(100vh-80px)]">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Main;
