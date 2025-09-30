import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Common Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Profile from "./Pages/Profile";
import Contact from "./Pages/Contact";
import AuthPage from "./Pages/AuthPage";
import AdminPage from "./Pages/admin/AdminPage";
import AllArtworks from "./Pages/AllArtworks";
import ArtDetail from "./Pages/ArtDetail";
import Users from "./Pages/Users";
import SystemSetting from "./Pages/admin/SystemSetting";
import UploadArt from "./Pages/UploadArt";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import UserProfilePage from "./Pages/UserProfilePage"; 
import Checkout from "./Pages/Checkout";
import PublicGallery from './Components/PublicGallery';
import PublicArtDetail from './Pages/PublicArtDetail';

import ManageArtworks from "./Pages/admin/ManageArtworks";
import ManageUsers from "./Pages/admin/ManageUsers";
import AdminDashboard from "./Pages/admin/AdminDashboard";



function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<AuthPage />} />
      
          <Route path="/users" element={<Users />} />
     

          <Route path="/upload" element={<UploadArt />} />
          <Route path="/user/:username" element={<UserProfilePage />} />


          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/all" element={<AllArtworks />} />
          <Route path="/art/:id" element={<ArtDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/explore" element={<PublicGallery />} />
          <Route path="/public-art/:id" element={<PublicArtDetail />} />
          {/* Admin Pages */}
      
          <Route path="/admin/artworks" element={<ManageArtworks />} />
        <Route path="/admin" element={<AdminPage />} />
<Route path="/admin/artworks" element={<ManageArtworks />} />
<Route path="/admin/settings" element={<SystemSetting />} />
<Route path="/admin/users" element={<ManageUsers />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
