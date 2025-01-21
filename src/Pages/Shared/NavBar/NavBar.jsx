import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import useAuth from "../../../Hooks/useAuth";
import Container from "../../../Components/Container";
import useUserStatus from "../../../Hooks/useUserStatus";
import logo2 from "../../../assets/Banner/Untitled_design__1_-removebg-preview.png";

const NavBar = () => {
  const { userDetails } = useUserStatus();
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const getLinkStyles = ({ isActive }) =>
    isActive
      ? "text-[#7367F0] font-semibold underline"
      : "text-gray-700 hover:text-[#7367F0]";

  const handleLogout = () => {
    logOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const employeeLinks = (
    <>
      <NavLink className={getLinkStyles} to={"/employeeHome"}>
        Home
      </NavLink>
      <NavLink className={getLinkStyles} to={"/employee/myAssets"}>
        My Assets
      </NavLink>
      <NavLink className={getLinkStyles} to={"/employee/myTeam"}>
        My Team
      </NavLink>
      <NavLink className={getLinkStyles} to={"/employee/requestAsset"}>
        Request for an Asset
      </NavLink>
      <NavLink className={getLinkStyles} to={"/profile"}>
        Profile
      </NavLink>
    </>
  );

  const hrLinks = (
    <>
      <NavLink className={getLinkStyles} to={"/hrHome"}>
        Home
      </NavLink>
      <NavLink className={getLinkStyles} to={"/hr/assets"}>
        Asset List
      </NavLink>
      <NavLink className={getLinkStyles} to={"/hr/addAssets"}>
        Add an Asset
      </NavLink>
      <NavLink className={getLinkStyles} to={"/hr/allRequests"}>
        All Requests
      </NavLink>
      <NavLink className={getLinkStyles} to={"/hr/myEmployee"}>
        My Employee List
      </NavLink>
      <NavLink className={getLinkStyles} to={"/hr/addEmployee"}>
        Add an Employee
      </NavLink>
      <NavLink className={getLinkStyles} to={"/profile"}>
        Profile
      </NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink className={getLinkStyles} to={"/"}>
        Home
      </NavLink>
      <NavLink className={getLinkStyles} to={"/signUp/employee"}>
        Join as Employee
      </NavLink>
      <NavLink className={getLinkStyles} to={"/signUp/hr"}>
        Join as HR Manager
      </NavLink>
    </>
  );

  return (
    <nav className="backdrop-blur-lg bg-white bg-opacity-65 border shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <AiOutlineClose size={28} />
              ) : (
                <AiOutlineMenu size={28} />
              )}
            </button>
          </div>

          {/* Logo */}
          <Link>
            {" "}
            <div>
              {user?.email && userDetails?.companyLogo ? (
                <img
                  className="w-20"
                  src={userDetails?.companyLogo}
                  alt="Company Logo"
                />
              ) : (
                <img className="w-24" src={logo2} alt="Default Logo" />
              )}
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-4">
            {user?.email
              ? userDetails?.role === "hr"
                ? hrLinks
                : userDetails?.role === "employee"
                ? employeeLinks
                : null
              : guestLinks}
          </div>

          {/* User Profile and Authentication */}
          <div className="flex gap-2 items-center">
            {user ? (
              <div className="flex gap-2 items-center">
                {user?.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="User  Profile"
                    className="w-10 hidden md:block h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={40} color="#555" />
                )}
                <p className="ml-2 hidden md:block">{user?.displayName}</p>
                <button
                  onClick={handleLogout}
                  className="px-4 flex items-center gap-1 py-1 shadow-sm shadow-[#FF4C51] bg-[#FF4C51] hover:bg-[#E64449] text-white rounded"
                >
                  <IoLogOutOutline /> Logout
                </button>
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="px-4 flex items-center gap-1 py-1 shadow-sm shadow-[#7367F0] bg-[#7367F0] hover:bg-[#685DD8] text-white rounded">
                  <HiOutlineLogin /> Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`fixed  flex flex-col left-0 h-fit rounded-md bg-white shadow-md rounded-r-md p-4 space-y-2 z-50 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300`}
          >
            <div className="flex items-center">
              {user?.photoURL ? (
                <img
                  src={user?.photoURL}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle size={40} color="#555" />
              )}
              <p className="ml-2">{user?.displayName}</p>
            </div>
            {user?.email
              ? userDetails?.role === "hr"
                ? hrLinks
                : userDetails?.role === "employee"
                ? employeeLinks
                : null
              : guestLinks}
            <div></div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default NavBar;
