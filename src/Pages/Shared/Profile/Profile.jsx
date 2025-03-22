import { Helmet } from "react-helmet-async";
import Container from "../../../Components/Container";
import showToast from "../../../Components/ShowToast";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";

const Profile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "+8801712345678");
  const [address, setAddress] = useState("Dhaka, Bangladesh");

  if (loading) return <>Loading...</>;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile({ displayName: fullName })
      .then(() => {
        showToast("Profile Updated Successfully", "success");
      })
      .catch((error) => {
        console.error(error);
        showToast("Failed to update profile", "error");
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Profile - AssetPanda</title>
        <meta name="description" content="Manage your profile on AssetPanda." />
      </Helmet>
      <div className="mt-8 bg-white max-w-2xl mx-auto p-6 shadow-md rounded-lg">
        <div className="text-center">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <h2 className="text-2xl font-semibold mb-2">{fullName}</h2>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
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
