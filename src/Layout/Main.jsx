import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const Main = () => {
  return (
    <>
      <div className="bg-[#F5F4F7]">
        <NavBar></NavBar>
        <div className="min-h-[calc(100vh-80px)]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
export default Main;
