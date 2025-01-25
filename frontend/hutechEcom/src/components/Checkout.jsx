import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css"; // Create a CSS file for the checkout page

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle payment method selection
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // Simulate a payment process
  const handlePayment = () => {
    if (paymentMethod) {
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/confirmation"); // Redirect to a confirmation page
      }, 2000); // Redirect after a short delay to simulate payment processing
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="checkout-container">
      <h3>Checkout</h3>
      <div className="payment-methods">
        <h4>Select Payment Method:</h4>
        <button onClick={() => handlePaymentMethod("Credit Card")} className="payment-button">Credit Card</button>
        <button onClick={() => handlePaymentMethod("PayPal")} className="payment-button">PayPal</button>
        <button onClick={() => handlePaymentMethod("Stripe")} className="payment-button">Stripe</button>
      </div>
      
      {paymentMethod && (
        <div className="payment-summary">
          <p>You selected: {paymentMethod}</p>
          <button onClick={handlePayment} className="pay-button">Pay Now</button>
        </div>
      )}

      {paymentSuccess && <p>Payment Successful! Redirecting...</p>}
    </div>
  );
};

export default Checkout;
