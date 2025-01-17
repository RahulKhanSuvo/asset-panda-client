import { useQuery } from "@tanstack/react-query";
import { IoIosCloseCircle } from "react-icons/io";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { imageUpload } from "../API/Utilits";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import showToast from "../Components/ShowToast";

const AssetsUpdateModal = ({ isOpen, setIsModalOpen, updateId, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: asset, isLoading } = useQuery({
    queryKey: ["updateAssets", updateId],
    queryFn: async () => {
      const { data } = await axiosSecure(`/assetsUpdate/${updateId}`);
      return data;
    },
    enabled: !!updateId,
  });

  // for update
  const handelUpdate = async (e) => {
    e.preventDefault();
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
      await axiosSecure.patch(`/assetsUpdate/${updateId}`, {
        ...productData,
        image: asset?.image,
        hrEmail: user?.email,
        timestamp: asset?.timestamp,
      });

      setIsModalOpen(false);
      showToast("update successfully");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed overflow-scroll inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md bg-white shadow-md relative rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Update An Asset
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handelUpdate} className="space-y-4">
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
                defaultValue={asset?.name}
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
                defaultValue={asset?.productType}
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
                defaultValue={asset?.quantity}
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
              Update
            </button>
          </form>
        )}

        <div className="absolute top-2 right-2">
          <button onClick={() => setIsModalOpen(false)}>
            <IoIosCloseCircle size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetsUpdateModal;
