import Container from "../../../Components/Container";
import showToast from "../../../Components/ShowToast";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";

const Profile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const [fullName, setFullName] = useState(user?.displayName);
  console.log(user?.displayName);
  if (loading) return <>loading</>;
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile({ displayName: fullName })
      .then((result) => {
        console.log(result);
        showToast("Profile Updated Successfully", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <div className="mt-8 bg-white max-w-2xl mx-auto p-6 shadow-md rounded-lg">
        <div className="text-center">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <h2 className="text-2xl font-semibold mb-2">
            {fullName ? fullName : user?.user?.displayName}
          </h2>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              defaultValue={user?.displayName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Update Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
