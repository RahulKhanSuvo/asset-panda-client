import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import usePayment from "../Hooks/usePayment";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
const CheckoutForm = () => {
  const { user } = useAuth();
  const [paymentStatus, isLoading] = usePayment();
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
          price: paymentStatus?.packageOption,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    if (paymentStatus?.packageOption > 0) {
      fetchPaymentIntent();
    }
  }, [axiosSecure, paymentStatus?.packageOption]);
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
      console.log("[error]", error);
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
          price: paymentStatus?.packageOption,
          date: new Date(),
          paymentStatus: "done",
          paymentId: paymentIntent.id,
        };
        try {
          axiosSecure.post("/paymentDone", payment);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Payment successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/hrHome");
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
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-red-500"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

export default CheckoutForm;
