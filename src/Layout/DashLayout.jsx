import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserStatus from "../Hooks/useUserStatus";
import { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";

const DashLayout = () => {
  const { user, logOut, loading } = useAuth();
  const { userDetails, isLoading } = useUserStatus();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log(user);
  useEffect(() => {
    if (!loading && !isLoading && user) {
      if (userDetails?.role === "hr") {
        navigate("/dashboard/hrHome");
      } else if (userDetails?.role === "employee") {
        navigate("/dashboard/employeeHome");
      }
    }
  }, [loading, isLoading, user, userDetails, navigate]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-blue-100 text-blue-600 px-3 py-2 rounded"
      : "px-3 py-2 hover:bg-gray-100 rounded";

  const employeeLinks = (
    <>
      <NavLink
        to="/dashboard/employeeHome"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard/employee/myAssets"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        My Assets
      </NavLink>
      <NavLink
        to="/dashboard/employee/myTeam"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        My Team
      </NavLink>
      <NavLink
        to="/dashboard/employee/requestAsset"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Request for an Asset
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Profile
      </NavLink>
    </>
  );

  const hrLinks = (
    <>
      <NavLink
        to="/dashboard/hrHome"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard/hr/assets"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Asset List
      </NavLink>
      <NavLink
        to="/dashboard/hr/addAssets"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Add an Asset
      </NavLink>
      <NavLink
        to="/dashboard/hr/allRequests"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        All Requests
      </NavLink>
      <NavLink
        to="/dashboard/hr/myEmployee"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        My Employee List
      </NavLink>
      <NavLink
        to="/dashboard/hr/addEmployee"
        className={navLinkStyle}
        onClick={() => setIsSidebarOpen(false)}
      >
        Add an Employee
      </NavLink>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 bg-white shadow-md p-5 space-y-4 transform transition-transform duration-200 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to={"/dashboard/profile"}>
            {" "}
            <img
              className="size-16 rounded-full border-2 shadow-md"
              src={user?.photoURL}
              alt=""
            />
            <div>
              <h3>{user?.displayName}</h3>
            </div>
          </Link>
        </div>
        <nav className="flex flex-col space-y-3">
          {user?.email
            ? userDetails?.role === "hr"
              ? hrLinks
              : employeeLinks
            : null}
        </nav>
        <button
          onClick={logOut}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 hidden md:block"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button
            onClick={logOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default DashLayout;
