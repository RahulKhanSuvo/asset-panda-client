import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo/AssetPandaLogoSVG.svg";
import Container from "../../../Components/Container";
import useAuth from "../../../Hooks/useAuth";
const NavBar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/signUp/employee"}>Join as Employee</NavLink>
      <NavLink to={"/signUp/hr"}>Join as HR Manager</NavLink>
    </>
  );
  return (
    <Container>
      {" "}
      <div className="flex justify-between items-center">
        {/* logo */}
        <div>
          <img className="w-24" src={logo} alt="" />
        </div>
        {/* nav link */}
        <div className="flex gap-6">{links}</div>
        <div>
          {user ? (
            <>
              <button onClick={logOut}>logout</button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default NavBar;
