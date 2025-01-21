import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { imageUpload } from "../../API/Utilits";
import usePayment from "../../Hooks/usePayment";
import { useNavigate } from "react-router-dom";
import showToast from "../../Components/ShowToast";
import ill from "../../assets/shapes/auth-register-illustration-light.png";
import Container from "../../Components/Container";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const EmployeeForm = () => {
  const [paymentStatus, isLoading, refetch] = usePayment();
  const [signLoading, setSignLoaing] = useState(false);
  const { userSignUp, updateUserProfile, googleLogin, loading } = useAuth();
  console.log(loading);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState("");

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
          showToast("Account created successfully");
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

  const validateForm = (form) => {
    const newErrors = {};
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const date = form.date.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!name) newErrors.name = "Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required.";
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.";
    }
    if (!date) newErrors.date = "Date of Birth is required.";

    return newErrors;
  };

  const validatePhoto = (photo) => {
    const maxSize = 2 * 1024 * 1024;
    if (photo.size > maxSize) {
      return "File size should be less than 2MB.";
    }
    if (!photo.type.startsWith("image/")) {
      return "File must be an image.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    setSignLoaing(true);

    const photo = form.photo.files[0];
    const photoValidationError = validatePhoto(photo);

    if (photoValidationError) {
      setPhotoError(photoValidationError);
      return;
    }
    setPhotoError("");

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const date = form.date.value;

    try {
      await userSignUp(email, password);
      const logoUrl = await imageUpload(photo);
      await updateUserProfile({ displayName: name, photoURL: logoUrl });
      await axiosPublic.post(`/employees/${email}`, {
        name,
        email,
        date,
        image: logoUrl,
      });
      showToast("Account created successfully");
      refetch();
      setSignLoaing(false);
      navigate("/");
    } catch (error) {
      showToast("please ty again", "error");
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Join as Employee - AssetPanda</title>
        <meta
          name="description"
          content="Join the AssetPanda team! Apply now to become an employee and start your career with us."
        />
        <meta
          name="keywords"
          content="AssetPanda, Employee, Join, Career, Apply"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section className="flex pt-10 min-h-[calc(100vh-70px)]">
        <div className="w-3/5 bg-no-repeat bg-bottom hidden lg:block">
          <img className="w-[500px] mx-auto" src={ill} alt="" />
        </div>
        <div className="lg:w-2/5 w-full md:px-16 mx-auto p-6 mb-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Your Journey Begins Here 🚀
          </h2>
          <p className="mb-4">
            Sign up now and become an essential part of your company's success.
            Manage tasks, access resources, and grow with your team!
          </p>

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
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] shadow-md"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] shadow-md"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-[6px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] shadow-md"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] shadow-md"
              />
              {errors.date && (
                <p className="text-red-600 text-sm">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#685DD8] shadow-md"
              />
              {photoError && (
                <p className="text-red-600 text-sm">{photoError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={signLoading}
              className={`w-full py-2 text-white rounded-md font-semibold shadow-md transition-colors duration-300 ${
                signLoading ? "bg-gray-400" : "bg-[#7367F0] hover:bg-[#685DD8]"
              }`}
            >
              {signLoading ? "Signing Up..." : "Sign Up"}
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
