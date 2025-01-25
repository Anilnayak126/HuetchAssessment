import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Confiramtion.css"; // Link to CSS for the confirmation page

const Confirmation = () => {
  const navigate = useNavigate();

  // Go back to the cart or home page
  const goBack = () => {
    navigate("/"); // Navigate to the home or cart page
  };

  return (
    <div className="confirmation-container">
      <h3>Payment Successful</h3>
      <p>Thank you for your purchase!</p>
      <div className="confirmation-details">
        <h4>Your order has been processed successfully.</h4>
        <p>A confirmation email will be sent to you shortly.</p>
      </div>
      <button onClick={goBack} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
