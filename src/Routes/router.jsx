import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import EmployeeForm from "../Pages/Employee/EmployeeForm";
import LoginPage from "../Pages/Auth/LoginPage";
import HrForm from "../Pages/HrForm/HrForm";
import Payment from "../Pages/Payment/Payment";
import EmployeeHome from "../Pages/Dashbord/Employee/EmployeeHome";
import HrHome from "../Pages/Dashbord/Hr/HrHome";
import AddEmployee from "../Pages/Dashbord/Hr/AddEmployee";
import Package from "../Components/Package";
import MyEmployeeList from "../Pages/Dashbord/Hr/MyEmployeeList";
import AddAssets from "../Pages/Dashbord/Hr/AddAssets";
import AssistList from "../Pages/Dashbord/Hr/AssistList";
import MyTeam from "../Pages/Dashbord/Employee/MyTeam";
import AssetsRequest from "../Pages/Dashbord/Employee/AssetsRequest";
import AllRequest from "../Pages/Dashbord/Hr/AllRequest";
import MyAssets from "../Pages/Dashbord/Employee/MyAssets";
import PrivateRouter from "./PrivateRouter";
import EmployeeRoute from "./EmployeeRoute";
import HrRouter from "./HrRouter";
import Profile from "../Pages/Shared/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // without login
      {
        path: "/signUp/employee",
        element: <EmployeeForm></EmployeeForm>,
      },
      {
        path: "/signUp/hr",
        element: <HrForm></HrForm>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
      },
      // employee routes
      {
        path: "/employee/requestAsset",
        element: (
          <PrivateRouter>
            <EmployeeRoute>
              <AssetsRequest></AssetsRequest>
            </EmployeeRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/employeeHome",
        element: (
          <PrivateRouter>
            <EmployeeRoute>
              <EmployeeHome></EmployeeHome>
            </EmployeeRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/employee/myTeam",
        element: (
          <PrivateRouter>
            <EmployeeRoute>
              <MyTeam></MyTeam>
            </EmployeeRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/employee/myAssets",
        element: (
          <PrivateRouter>
            <EmployeeRoute>
              <MyAssets></MyAssets>
            </EmployeeRoute>
          </PrivateRouter>
        ),
      },
      // hr routes
      {
        path: "/hrHome",
        element: (
          <PrivateRouter>
            <HrRouter>
              <HrHome></HrHome>
            </HrRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/hr/myEmployee",
        element: (
          <PrivateRouter>
            <HrRouter>
              <MyEmployeeList></MyEmployeeList>
            </HrRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/hr/addEmployee",
        element: (
          <PrivateRouter>
            <HrRouter>
              <AddEmployee></AddEmployee>
            </HrRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/hr/addAssets",
        element: (
          <PrivateRouter>
            <HrRouter>
              <AddAssets></AddAssets>
            </HrRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/packages",
        element: (
          <PrivateRouter>
            <HrRouter>
              <Package></Package>
            </HrRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/hr/assets",
        element: (
          <PrivateRouter>
            <HrRouter>
              <AssistList></AssistList>
            </HrRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/hr/allRequests",
        element: (
          <PrivateRouter>
            <HrRouter>
              <AllRequest></AllRequest>
            </HrRouter>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
