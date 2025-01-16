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
        path: "/payment",
        element: <Payment></Payment>,
      },
      // employee routes
      {
        path: "/employeeHome",
        element: <EmployeeHome></EmployeeHome>,
      },
      // hr routes
      {
        path: "/hrHome",
        element: <HrHome></HrHome>,
      },
      {
        path: "/hr/myEmployee",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "/hr/addEmployee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "/hr/addAssets",
        element: <AddAssets></AddAssets>,
      },
      {
        path: "/packages",
        element: <Package></Package>,
      },
    ],
  },
]);
