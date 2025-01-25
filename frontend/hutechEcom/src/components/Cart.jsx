import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import "../styles/Cart.css"; // Make sure the CSS file is properly linked

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use history for page navigation

  useEffect(() => {
    // Fetch cart data from the API
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cart/view-cart/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setCart(response.data.items);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch cart");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  };

  // Remove item from cart
  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8000/cart/remove-from-cart/${cartItemId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCart(cart.filter(item => item.id !== cartItemId)); // Remove from state after successful deletion
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Update item quantity in cart
  const updateItem = async (cartItemId, newQuantity) => {
    try {
      await axios.patch(`http://localhost:8000/cart/update-cart/${cartItemId}/`, 
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCart(cart.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate("/checkout"); // Redirect to checkout page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-container">
      <h3>Your Cart</h3>
      {cart.length > 0 ? (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product_name}</p>
                    <p className="cart-item-price">
                      ${item.product_price} x {item.quantity} = $ 
                      {item.product_price * item.quantity}
                    </p>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button 
                    className="update-button" 
                    onClick={() => updateItem(item.id, item.quantity + 1)}>
                    Increase
                  </button>
                  <button 
                    className="update-button" 
                    onClick={() => updateItem(item.id, item.quantity - 1)}>
                    Decrease
                  </button>
                  <button 
                    className="remove-button" 
                    onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <h4>Total: ${calculateTotal()}</h4>
          </div>
          {/* Checkout Button */}
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
