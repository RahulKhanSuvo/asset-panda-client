import { Link, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { HiOutlineLogin } from "react-icons/hi";
import Container from "../../../Components/Container";
import logoFav from "../../../assets/Logo/AssetPandaLogoSVG.svg";
import useUserStatus from "../../../Hooks/useUserStatus";
const NavBar = () => {
  const { userDetails } = useUserStatus();
  const { user, logOut } = useAuth();
  const employeeLinks = (
    <>
      <NavLink to={"/employeeHome"}>Home</NavLink>
      <NavLink to={"/employee/myAssets"}>My Assets</NavLink>
      <NavLink to={"/employee/myTeam"}>My Team</NavLink>
      <NavLink to={"/employee/requestAsset"}>Request for an Asset</NavLink>
      <NavLink to={"/profile"}>Profile</NavLink>
    </>
  );

  const hrLinks = (
    <>
      <NavLink to={"/hrHome"}>Home</NavLink>
      <NavLink to={"/hr/assets"}>Asset List</NavLink>
      <NavLink to={"/hr/addAssets"}>Add an Asset</NavLink>
      <NavLink to={"/hr/allRequests"}>All Requests</NavLink>
      <NavLink to={"/hr/myEmployee"}>My Employee List</NavLink>
      <NavLink to={"/hr/addEmployee"}>Add an Employee</NavLink>
      <NavLink to={"/profile"}>Profile</NavLink>
    </>
  );
  const handleLogout = () => {
    logOut();
  };
  const guestLinks = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[#7367F0]  underline"
            : "text-gray-700 hover:text-[#7367F0]"
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[#7367F0] underline"
            : "text-gray-700 hover:text-[#7367F0]"
        }
        to={"/signUp/employee"}
      >
        Join as Employee
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[#7367F0]  underline"
            : "text-gray-700 hover:text-[#7367F0]"
        }
        to={"/signUp/hr"}
      >
        Join as HR Manager
      </NavLink>
    </>
  );

  return (
    <nav className="backdrop-blur-lg bg-white bg-opacity-65 border">
      <Container>
        <div className="flex justify-between items-center py-4 top-0  z-10 text-black ">
          {/* Logo */}
          <div>
            {user?.email && userDetails?.companyLogo ? (
              <>
                {userDetails?.role === "hr" ||
                userDetails?.role === "employee" ? (
                  <img
                    className="size-12"
                    src={userDetails?.companyLogo}
                    alt="Company Logo"
                  />
                ) : (
                  <img className="w-24" src={logoFav} alt="Default Logo" />
                )}
              </>
            ) : (
              <img className="w-24" src={logoFav} alt="Default Logo" />
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6">
            {user?.email ? (
              <>
                {userDetails?.role === "hr"
                  ? hrLinks
                  : userDetails?.role === "employee"
                  ? employeeLinks
                  : null}
              </>
            ) : (
              <>{guestLinks}</>
            )}
          </div>
          {/* User Profile and Authentication */}
          <div>
            {user ? (
              <div className="flex gap-2 items-center">
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
      </Container>
    </nav>
  );
};

export default NavBar;
