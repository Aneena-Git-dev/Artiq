import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaCaretDown } from "react-icons/fa";
import "../Styles/Navbar.css";
import { GlobalContext } from "../context/GlobalContext";
import AuthDropdown from "./AuthDropdown";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems, wishlistItems } = useContext(GlobalContext);

  // Cart count
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Wishlist count
  const wishlistCount = wishlistItems.length;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{ height: "100px" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">Artiq</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-none d-lg-flex">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {/* User Dropdown */}
            <li className="nav-item dropdown-container">
              <button className="nav-link" onClick={toggleDropdown}>
                <FaUser />
              </button>
              <div className={`dropdown-box ${dropdownOpen ? "show" : ""}`}>
                <AuthDropdown />
              </div>
            </li>

            {/* Wishlist */}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/wishlist">
                <FaHeart />
                {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </Link>
            </li>
          </ul>

          {/* Mobile Dropdown */}
          <ul className="navbar-nav ms-auto d-lg-none">
            <li className="nav-item dropdown-container">
              <button className="nav-link" onClick={toggleDropdown}>
                <FaCaretDown />
              </button>
              <div className={`dropdown-box ${dropdownOpen ? "show" : ""}`}>
                <Link to="/" className="dropdown-link">Home</Link>
                <Link to="/about" className="dropdown-link">About</Link>
                <Link to="/gallery" className="dropdown-link">Gallery</Link>
                <Link to="/profile" className="dropdown-link">Profile</Link>
                <Link to="/contact" className="dropdown-link">Contact</Link>
                <AuthDropdown />
                <Link to="/wishlist" className="dropdown-link">
                  <FaHeart />
                  {wishlistCount > 0 && <span className="wishlist-count-mobile">{wishlistCount}</span>}
                </Link>
                <Link to="/cart" className="dropdown-link">
                  <FaShoppingCart />
                  {totalItems > 0 && <span className="cart-count-mobile">{totalItems}</span>}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
