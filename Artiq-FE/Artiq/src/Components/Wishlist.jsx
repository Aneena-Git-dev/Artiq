import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../Styles/Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, setWishlistItems, cartItems, setCartItems } = useContext(GlobalContext);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (item) => {
    if (!cartItems.find((ci) => ci.id === item.id)) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      toast.success("Moved to cart!");
    } else {
      toast.info("Item already in cart.");
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.info("Removed from wishlist.");
  };

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty!</p>
          <Link to="/gallery">
            <button className="continue-shopping-btn">Continue Browsing</button>
          </Link>
        </div>
      ) : (
        <div className="wishlist-items row">
          {wishlistItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="wishlist-card d-flex flex-column h-100 shadow-sm">
                <img src={item.image} alt={item.name} className="wishlist-img" />
                <div className="item-details p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Price: ₹{item.price}</p>
                  </div>
                  <div className="btn-group mt-3">
                    <button className="wishlist-btn add-btn" onClick={() => moveToCart(item)}>
                      Move to Cart
                    </button>
                    <button className="wishlist-btn remove-btn" onClick={() => removeFromWishlist(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
