import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../API/Utilits";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import showToast from "../../Components/ShowToast";

const HrForm = () => {
  const { userSignUp, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const companyName = form.companyName.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const packageOption = parseInt(form.package.value);
    const companyLogo = form.companyLogo.files[0];
    const profilePhoto = form.photo.files[0];
    console.log({
      fullName,
      companyName,
      email,
      dateOfBirth,
      packageOption,
      companyLogo,
    });
    const logoUrl = await imageUpload(companyLogo);
    const profileUrl = await imageUpload(profilePhoto);
    userSignUp(email, password)
      .then((result) => {
        console.log(result);
        updateUserProfile({ displayName: fullName, photoURL: profileUrl })
          .then(async () => {
            try {
              await axiosPublic.post(`/hr/${email}`, {
                fullName,
                email,
                companyName,
                date_of_birth: dateOfBirth,
                packageOption,
                companyLogo: logoUrl,
              });
              showToast("Successfully joined as HR Manager!");
              navigate("/payment");
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            showToast("Please try again", "error");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Join as HR Manager
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your company name"
              required
            />
          </div>

          {/* Company Logo */}
          <div>
            <label
              htmlFor="companyLogo"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Company Logo
            </label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              accept="image/*"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
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
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#F80136]"
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Select Package */}
          <div>
            <label
              htmlFor="package"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Select a Package
            </label>
            <select
              id="package"
              name="package"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5 Members - $5</option>
              <option value="8">10 Members - $8</option>
              <option value="15">20 Members - $15</option>
            </select>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default HrForm;
