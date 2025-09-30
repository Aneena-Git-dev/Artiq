// src/context/GlobalContext.jsx

import React, { createContext, useState, useEffect } from "react";

// Create the global context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // State for uploaded artworks
  const [uploadedArtworks, setUploadedArtworks] = useState(() => {
    const savedArtworks = localStorage.getItem("uploadedArtworks");
    return savedArtworks ? JSON.parse(savedArtworks) : [];
  });

  // State for cart items
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State for wishlist items
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // State for registered users (mock data)
  const [users, setUsers] = useState([
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Aneena', email: 'aneena@example.com' },
  ]);

  // State for reviews (some approved, some pending)
  const [reviews, setReviews] = useState([
    { id: 1, approved: false },
    { id: 2, approved: true },
    { id: 3, approved: false }
  ]);

  // State for logged-in user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem("uploadedArtworks", JSON.stringify(uploadedArtworks));
  }, [uploadedArtworks]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        uploadedArtworks,
        setUploadedArtworks,
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems,
        users,
        setUsers,
        reviews,
        setReviews,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
