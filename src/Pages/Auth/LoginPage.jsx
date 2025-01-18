import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUserStatus from "../../Hooks/useUserStatus";
import showToast from "../../Components/ShowToast";

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
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h6.5c-.3 1.4-1 2.6-2 3.5v2.9h3.3c2-1.8 3.2-4.5 3.2-7.5z" />
            <path d="M12 24c3 0 5.5-1 7.3-2.7l-3.3-2.9c-1 .7-2.3 1.1-4 1.1-3 0-5.5-2-6.4-4.7H2v2.9C3.8 21 7.6 24 12 24z" />
            <path d="M5.6 14.4c-.3-.9-.5-1.8-.5-2.9s.2-2 .5-2.9V6.6H2C.7 8.9 0 11.4 0 14s.7 5 2 7.3l3.6-2.9z" />
            <path d="M12 4.7c1.7 0 3.3.6 4.4 1.8l3.3-3.3C17.5 1.3 14.9 0 12 0 7.6 0 3.8 2.9 2 7.3l3.6 2.9c.9-2.7 3.4-4.7 6.4-4.7z" />
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
