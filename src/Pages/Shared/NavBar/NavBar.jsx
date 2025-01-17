import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import usePayment from "../../../Hooks/usePayment";
import Container from "../../../Components/Container";
import logoFav from "../../../assets/Logo/AssetPandaLogoSVG.svg";
import useUserStatus from "../../../Hooks/useUserStatus";
const NavBar = () => {
  const [paymentStatus, isLoading, refetch] = usePayment();
  const { userInfo } = useUserStatus();
  console.log(userInfo);
  const { user, logOut } = useAuth();
  console.log(paymentStatus.role);
  const employeeLinks = (
    <>
      <NavLink to={"/employeeHome"}>Home</NavLink>
      <NavLink to={"/employee/myAssets"}>My Assets</NavLink>
      <NavLink to={"/employee/myTeam"}>My Team</NavLink>
      <NavLink to={"/employee/requestAsset"}>Request for an Asset</NavLink>
      <NavLink to={"/employee/profile"}>Profile</NavLink>
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
      <NavLink to={"/hr/profile"}>Profile</NavLink>
    </>
  );
  const handleLogout = () => {
    logOut();
    refetch();
  };
  const guestLinks = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/signUp/employee"}>Join as Employee</NavLink>
      <NavLink to={"/signUp/hr"}>Join as HR Manager</NavLink>
    </>
  );

  return (
    <nav className="bg-[#262E40]">
      <Container>
        <div className="flex justify-between items-center py-4 top-0  z-10 text-white shadow-md">
          {/* Logo */}
          <div>
            {user?.email ? (
              <>
                {userInfo?.role === "hr" || userInfo?.role === "employee" ? (
                  <img src={userInfo?.companyLogo} alt="Company Logo" />
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
                {paymentStatus?.role === "hr"
                  ? hrLinks
                  : paymentStatus?.role === "employee"
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
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Login
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
