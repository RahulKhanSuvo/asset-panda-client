import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Components/CheckoutForm";
import usePayment from "../../Hooks/usePayment";
import useUserStatus from "../../Hooks/useUserStatus";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [paymentStatus] = usePayment();
  const { refetch, userDetails } = useUserStatus();

  return (
    <div>
      <h3 className="text-center text-4xl">Payment</h3>
      <div className="max-w-2xl mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={paymentStatus?.packageOption}
            refetch={refetch}
          />
        </Elements>
      </div>
      {userDetails?.paymentStatus === "done" && (
        <p className="text-center text-green-600 mt-4">
          Payment completed successfully!
        </p>
      )}
    </div>
  );
};

export default Payment;
