import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import showToast from "../Components/ShowToast";

const RequestAssetsModal = ({ isOpen, setIsOpen, asset }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(asset);
  const [notes, setNotes] = useState("");

  const handleRequest = async () => {
    try {
      const { data } = await axiosSecure.post("/assetRequest", {
        assetId: asset?._id,
        assetName: asset?.name,
        assetType: asset?.productType,
        hrEmail: asset?.hrEmail,
        reqEmail: user?.email,
        reqName: user.displayName,
        notes: notes,
        status: "pending",
        requestDate: new Date().toISOString(),
      });
      console.log(data);
      showToast("Request Sent Successfully");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      showToast(`${error.message}`, "error");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Request Asset</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            onClick={(e) => setNotes(e.target.value)}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add your notes here..."
          ></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleRequest}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAssetsModal;
