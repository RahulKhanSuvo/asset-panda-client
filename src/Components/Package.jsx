import { useState } from "react";
import PurchaseModal from "../Modal/PurchaseModal";
import Container from "./Container";
import p1 from "../assets/Logo/paper-airplane.png";
import p2 from "../assets/Logo/plane.png";
import p3 from "../assets/Logo/shuttle-rocket.png";

const Package = () => {
  const [selected, setSelected] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = [
    {
      id: 1,
      title: "Starter",
      price: 5,
      description: "Suitable for businesses with up to 5 employees.",
      members: 5,
      logo: p1,
    },
    {
      id: 2,
      title: "Growth",
      price: 8,
      description: "Perfect for businesses with up to 10 employees.",
      members: 10,
      logo: p2,
    },
    {
      id: 3,
      title: "Enterprise",
      price: 15,
      description: "Ideal for larger businesses with up to 20 employees.",
      members: 20,
      logo: p3,
    },
  ];

  const handlePurchase = () => {
    setIsModalOpen(true);
  };

  return (
    <Container>
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl text-center font-bold mb-4 text-[#7367F0]">
          Choose Your Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`border p-4 bg-white rounded-lg shadow-md text-center flex flex-col items-center ${
                selected === pkg.price
                  ? "border-[#7367F0] bg-[#F5F5FF] transform scale-105"
                  : "border-gray-300"
              }`}
            >
              <img
                src={pkg.logo}
                alt={`${pkg.title} Logo`}
                className="w-16 h-16 mb-4"
              />
              <div className="flex-grow">
                <h3
                  className={`text-lg font-semibold ${
                    selected === pkg.price ? "text-[#7367F0]" : "text-gray-700"
                  }`}
                >
                  {pkg.title} - {pkg.members} Members for ${pkg.price}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{pkg.description}</p>
              </div>
              <button
                className={`mt-4 px-4 py-2 rounded text-white ${
                  selected === pkg.price
                    ? "bg-[#7367F0]"
                    : "bg-[#7367F0] hover:bg-[#685DD8]"
                }`}
                onClick={() => {
                  setSelected(pkg.price);
                  handlePurchase();
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
          price={selected}
        />
      </div>
    </Container>
  );
};

export default Package;
