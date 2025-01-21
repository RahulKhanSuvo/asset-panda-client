import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../API/Utilits";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import showToast from "../../Components/ShowToast";
import Container from "../../Components/Container";
import hrIll from "../../assets/shapes/hrlogin.png";

const HrForm = () => {
  const { userSignUp, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName) newErrors.fullName = "Full Name is required.";
    if (!data.companyName) newErrors.companyName = "Company Name is required.";
    if (!data.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Invalid email format.";
    if (!data.password || data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!data.packageOption)
      newErrors.packageOption = "Please select a package.";
    if (!data.companyLogo) newErrors.companyLogo = "Company Logo is required.";
    if (!data.profilePhoto)
      newErrors.profilePhoto = "Profile Photo is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      fullName: form.fullName.value.trim(),
      companyName: form.companyName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      dateOfBirth: form.dateOfBirth.value,
      packageOption: parseInt(form.package.value),
      companyLogo: form.companyLogo.files[0],
      profilePhoto: form.photo.files[0],
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear previous errors

    try {
      const logoUrl = await imageUpload(data.companyLogo);
      const profileUrl = await imageUpload(data.profilePhoto);
      const result = await userSignUp(data.email, data.password);

      await updateUserProfile({
        displayName: data.fullName,
        photoURL: profileUrl,
      });

      await axiosPublic.post(`/hr/${data.email}`, {
        fullName: data.fullName,
        email: data.email,
        companyName: data.companyName,
        date_of_birth: data.dateOfBirth,
        packageOption: data.packageOption,
        companyLogo: logoUrl,
      });

      showToast("Successfully joined as HR Manager!");
      navigate("/payment");
    } catch (error) {
      console.error("Error signing up:", error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Container>
      <section className="flex pt-6 items-center">
        <div className="px-24 hidden lg:block">
          <img src={hrIll} alt="HR Illustration" />
        </div>
        <div className="mx-auto bg-gray-100">
          <div className="p-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-3xl font-bold">Account Information</h2>
            <p className="mb-3">Enter Your Account Details</p>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                  placeholder="Enter your company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">{errors.companyName}</p>
                )}
              </div>

              {/* Company Logo */}
              <div>
                <label
                  htmlFor="companyLogo"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Company Logo
                </label>
                <input
                  type="file"
                  id="companyLogo"
                  name="companyLogo"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                />
                {errors.companyLogo && (
                  <p className="text-red-500 text-sm">{errors.companyLogo}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Profile Photo */}
              <div>
                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Profile Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                />
                {errors.profilePhoto && (
                  <p className="text-red-500 text-sm">{errors.profilePhoto}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Select Package */}
              <div>
                <label
                  htmlFor="package"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Select a Package
                </label>
                <select
                  id="package"
                  name="package"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                >
                  <option value="">Select a package</option>
                  <option value="5">5 Members - $5</option>
                  <option value="8">10 Members - $8</option>
                  <option value="15">20 Members - $15</option>
                </select>
                {errors.packageOption && (
                  <p className="text-red-500 text-sm">{errors.packageOption}</p>
                )}
              </div>

              {/* Signup Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-[#7367F0] rounded-lg shadow-sm shadow-[#5D54C8] hover:bg-[#5d54c8] focus:outline-none focus:ring-2 focus:ring-[#7367F0]"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HrForm;
