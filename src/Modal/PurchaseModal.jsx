import { Elements } from "@stripe/react-stripe-js";
import { IoMdCloseCircle } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import PayForm from "../Components/PayForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const PurchaseModal = ({ isOpen, setIsModalOpen, price }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full relative max-w-md  bg-white rounded-lg shadow-lg">
        <Elements stripe={stripePromise}>
          <PayForm price={price}></PayForm>
        </Elements>

        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-0 right-0 text-[#262E40]"
        >
          <IoMdCloseCircle size={28} />
        </button>
      </div>
    </div>
  );
};

export default PurchaseModal;
