import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer";
import useAuth from "../Hooks/useAuth";
import UrFooter from "../Pages/Shared/Profile/UrFooter";

const Main = () => {
  const { user } = useAuth();
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
      {user ? <UrFooter></UrFooter> : <Footer></Footer>}
    </>
  );
};
export default Main;
