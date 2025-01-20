import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { imageUpload } from "../../API/Utilits";
import usePayment from "../../Hooks/usePayment";
import { useNavigate } from "react-router-dom";
import showToast from "../../Components/ShowToast";
import ill from "../../assets/shapes/auth-register-illustration-light.png";
import illBg from "../../assets/shapes/bg-shape-image-light.png";
import Container from "../../Components/Container";
const EmployeeForm = () => {
  const [paymentStatus, isLoading, refetch] = usePayment();
  const { userSignUp, updateUserProfile, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSocialLogin = () => {
    googleLogin()
      .then(async (result) => {
        try {
          await axiosPublic.post(`/employees/${result.user.email}`, {
            name: result.user.displayName,
            email: result.user.email,
            date_of_birth: null,
            image: result.user.photoURL || null,
          });
          showToast("account create successful");
          refetch();
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const date = form.date.value;
    const photo = form.photo.files[0];

    try {
      const logoUrl = await imageUpload(photo);
      const result = await userSignUp(email, password);
      console.log(result);

      await updateUserProfile({ displayName: name, photoURL: logoUrl });
      console.log("User profile updated");

      const { data } = await axiosPublic.post(`/employees/${email}`, {
        name,
        email,
        date,
        image: logoUrl,
      });
      console.log("Employee created:", data);
      refetch();
      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Container>
      <section className="flex mt-10  min-h-[calc(100vh-70px)">
        <div className=" w-3/5 bg-no-repeat bg-bottom hidden lg:block">
          <img className=" w-[500px] mx-auto " src={ill} alt="" />
        </div>
        <div className=" lg:w-2/5 w-full md:px-16 mx-auto p-6 mb-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Your Journey Begins Here 🚀
          </h2>
          <p className="mb-4">
            Sign up now and become an essential part of your company's success.
            Manage tasks, access resources, and grow with your team!
          </p>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
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
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
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
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                required
                name="photo"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] sh focus:shadow-md focus:shadow-[#685DD8]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#7367F0] text-white rounded-md font-semibold shadow-md hover:bg-[#685DD8] transition-colors duration-300"
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
      </section>
    </Container>
  );
};

export default EmployeeForm;
