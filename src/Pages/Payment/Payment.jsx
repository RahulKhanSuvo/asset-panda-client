import { useState } from "react";
import usePayment from "../../Hooks/usePayment";
import PurchaseModal from "../../Modal/PurchaseModal";

const Payment = () => {
  const [paymentStatus, isLoading] = usePayment();
  console.log(paymentStatus);
  const [selected, setSelected] = useState(paymentStatus.packageOption);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selected);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const packages = [
    {
      id: 1,
      members: 5,
      price: 5,
      description:
        "Ideal for small teams or startups looking for basic features.",
    },
    {
      id: 2,
      members: 10,
      price: 8,
      description:
        "Perfect for growing teams who need more collaboration options.",
    },
    {
      id: 3,
      members: 20,
      price: 15,
      description:
        "Best for larger teams requiring advanced tools and support.",
    },
  ];

  const handlePurchase = (packageId) => {
    console.log(`Purchased package: ${packageId}`);
    setIsModalOpen(true);
    // Add logic for processing purchase
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">
        Choose Your Package
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`border p-4 rounded-lg shadow-md text-center flex flex-col ${
              selected === pkg.members
                ? "border-blue-500 bg-blue-100 transform scale-105"
                : "border-gray-300"
            } ${
              selected === pkg.members
                ? "md:col-span-1 md:mx-auto"
                : "md:col-span-1"
            }`}
          >
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">
                {pkg.members} Members for ${pkg.price}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{pkg.description}</p>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded text-white ${
                selected === pkg.members
                  ? "bg-blue-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => {
                setSelected(pkg.members);
                handlePurchase(pkg.id);
              }}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
      <PurchaseModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></PurchaseModal>
    </div>
  );
};

export default Payment;
