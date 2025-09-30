// src/Pages/Cart.jsx

import React, { useContext} from "react";
import { GlobalContext } from "../context/GlobalContext";
import "../Styles/Cart.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const total = subtotal;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty!</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>by {item.artist}</p>
                  <p>₹{item.price}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <p>Total: ₹{item.price * (item.quantity || 1)}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/gallery")}
            >
              ← Continue Shopping
            </button>

            <h3>Order Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Subtotal: ₹{subtotal}</p>
            <h4>Total: ₹{total}</h4>

            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
