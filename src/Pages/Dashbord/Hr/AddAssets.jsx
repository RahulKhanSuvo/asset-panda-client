import { useState } from "react";
import showToast from "../../../Components/ShowToast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ImSpinner3 } from "react-icons/im";
const AddAssets = () => {
  const { user } = useAuth();
  const [addLoading, setAddLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleAddAsset = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    const form = e.target;
    const name = form.name.value;
    const productType = form.productType.value;
    const quantity = parseInt(form.quantity.value);
    const productData = {
      name,
      productType,
      quantity,
    };
    try {
      const { data } = await axiosSecure.post("/addedAsset", {
        ...productData,

        hrEmail: user?.email,
      });
      console.log(data);
      showToast("Asset added successfully!", "success");
      form.reset();
    } catch (error) {
      console.log(error);
      showToast("please try again", "error");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Add New Asset
        </h2>
        <form onSubmit={handleAddAsset} className="space-y-4">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="productType"
              className="block text-sm font-medium text-gray-600"
            >
              Product Type
            </label>

            <select
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              name="productType"
              id=""
            >
              <option value="returnable">Returnable </option>
              <option value="non-returnable"> Non-returnable </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="productQuantity"
              className="block text-sm font-medium text-gray-600"
            >
              Product Quantity
            </label>
            <input
              type="number"
              id="productQuantity"
              name="quantity"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product quantity"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            {!addLoading ? "Add" : <ImSpinner3 className="animate-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAssets;
