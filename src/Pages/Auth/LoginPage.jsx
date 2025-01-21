import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUserStatus from "../../Hooks/useUserStatus";
import showToast from "../../Components/ShowToast";
import logo from "../../assets/Logo/AssetPandaLogoSVG.svg";
import sp1 from "../../assets/Logo/svg_ (1).svg";
import sp2 from "../../assets/Logo/svg__ (1).svg";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
const LoginPage = () => {
  const { userSignIn, googleLogin } = useAuth();
  const { refetch } = useUserStatus();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSocialLogin = () => {
    googleLogin()
      .then(async (result) => {
        try {
          await axiosPublic.post(`/employees/${result?.user?.email}`, {
            name: result?.user?.displayName,
            email: result?.user?.email,
            date_of_birth: null,
            image: result?.user?.photoURL,
          });
          navigate("/");
          refetch();
          showToast("login successful");
        } catch (error) {
          showToast("please try again", "error");
        }
      })
      .catch(() => {
        showToast("please try again", "error");
      });
  };
  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email);
    userSignIn(email, password)
      .then(() => {
        refetch();
        showToast("login successful");
        navigate("/");
      })
      .catch((error) => {
        showToast("please try again", "error");
      });
  };
  return (
    <div className=" min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Login - AssetPanda</title>
        <meta
          name="description"
          content="Log in to your AssetPanda account to manage employees, track performance, and stay connected with your team."
        />
        <meta
          name="keywords"
          content="AssetPanda, Login, Employee Management, Team, HR, Login to Account"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="relative">
        <img
          className="absolute hidden md:block -top-16 -left-8 "
          src={sp2}
          alt="Decorative Shape"
        />

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-xl border shadow-md p-8 space-y-4 bg-white rounded-md">
          <div>
            <img className="w-28 object-cover mx-auto" src={logo} alt="Logo" />
          </div>
          <h2 className="text-2xl font-medium text-gray-700">
            Welcome to AssetPanda 👋
          </h2>
          <p>Please sign-in to your account and start managing your assets</p>

          {/* Email/Password Form */}
          <form onSubmit={handelLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                id="email"
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                id="password"
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-[6px] text-white bg-[#7367F0] rounded-lg hover:bg-[#685DD8] focus:outline-none focus:ring-2 "
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-between space-x-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm font-medium text-gray-600">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleSocialLogin}
            className="w-full flex justify-center items-center bg-[#EFF2F7] p-[6px] rounded-full"
          >
            <FcGoogle size={25} />
          </button>
        </div>

        <img
          className="absolute hidden md:block -bottom-14 -right-14"
          src={sp1}
          alt="Decorative Shape"
        />
      </div>
    </div>
  );
};

export default LoginPage;
