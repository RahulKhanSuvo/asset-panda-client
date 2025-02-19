import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
const CheckoutForm = ({ price, refetch }) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          price: price,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    if (price > 0) {
      fetchPaymentIntent();
    }
  }, [axiosSecure, price]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    const { paymentIntent, error: cardConformError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (cardConformError) {
      console.log(cardConformError);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          price: price,
          date: new Date(),
          paymentStatus: "done",
          paymentId: paymentIntent.id,
        };
        try {
          await axiosSecure.post("/paymentDone", payment);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Payment successfully",
            showConfirmButton: false,
            timer: 3000,
          });
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: errorMessage,
            showConfirmButton: false,
            timer: 3000,
          });
        } finally {
          refetch();
          navigate("dashboard/hrHome");
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Payment Details
        </h2>
        <div className="w-full border p-4 rounded-lg bg-white shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="bg-gray-50 border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </div>
      <p className="text-red-600 text-center">{error}</p>
    </form>
  );
};

export default CheckoutForm;
