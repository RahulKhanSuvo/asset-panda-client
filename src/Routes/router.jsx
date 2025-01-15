import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import EmployeeForm from "../Pages/Employee/EmployeeForm";
import LoginPage from "../Pages/Auth/LoginPage";
import HrForm from "../Pages/HrForm/HrForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
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
    ],
  },
]);
