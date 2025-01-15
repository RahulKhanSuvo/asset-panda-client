import { FaGoogle } from "react-icons/fa";

import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const EmployeeForm = () => {
  const { userSignUp, updateUserProfile, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleSocialLogin = () => {
    googleLogin()
      .then(async (result) => {
        console.log(result.user);
        try {
          const { data } = await axiosPublic.post(
            `/employees/${result.user.email}`,
            {
              name: result.user.displayName,
              email: result.user.email,
              date_of_birth: null,
            }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const date = form.date.value;

    userSignUp(email, password)
      .then((result) => {
        console.log(result);
        updateUserProfile({ displayName: name, photoURL: null })
          .then(async () => {
            try {
              const { data } = await axiosPublic.post(`/employees/${email}`, {
                name,
                email,
                date_of_birth: date,
              });
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            console.log("error from update", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#F80136]">
        Join as an Employee
      </h2>
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#F80136]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#F80136]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#F80136]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#F80136]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#F80136] text-white rounded-md font-semibold hover:bg-red-700 transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
      {/* Social Login Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Or sign up with</p>
        <button
          onClick={handleSocialLogin}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 mx-auto hover:bg-blue-700 transition-colors duration-300"
        >
          <FaGoogle />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;
