import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To navigate to the cart page
import "../styles/Product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); // To keep track of quantities
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product/products/");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle quantity change
  const handleQuantityChange = (e, productId) => {
    const value = parseInt(e.target.value);
    setQuantities((prev) => ({
      ...prev,
      [productId]: value > 0 ? value : 1, // Ensure the quantity is at least 1
    }));
  };

  // Function to add product to the cart
  const addToCart = async (productId) => {
    const quantity = quantities[productId] || 1; // Default quantity to 1 if not set
    try {
      await axios.post(
        "http://localhost:8000/cart/add-to-cart/",
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };

  // Redirect to Cart page
  const redirectToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-container">
      <h2 className="products-heading">Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <span className="product-price">${product.price}</span>
              <div className="quantity-container">
                <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(e, product.id)}
                  min="1"
                  className="quantity-input"
                />
              </div>
              <button
                onClick={() => addToCart(product.id)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={redirectToCart} className="view-cart-btn">
        View Cart
      </button>
    </div>
  );
};

export default ProductList;
