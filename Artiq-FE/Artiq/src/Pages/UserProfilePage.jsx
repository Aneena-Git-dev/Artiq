// src/Pages/UserProfilePage.jsx
import React, { useEffect, useState, useContext } from "react";
import "../Styles/UserProfile.css";
import api from "../api";
import { GlobalContext } from "../context/GlobalContext";

const UserProfilePage = () => {
  const { uploadedArtworks, setUploadedArtworks } = useContext(GlobalContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Editable fields
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);

  const [artworkEdits, setArtworkEdits] = useState({}); // {artId: {title, price}}
  const [previewArtwork, setPreviewArtwork] = useState(null); // Preview selected artwork

  // Fetch logged-in user profile
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Get user details
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data.user;
      setUserProfile(user);
      setBio(user.bio || "");
      setLocation(user.location || "");

      // ✅ Get artworks uploaded by this user
      const artworksRes = await api.get("/artworks/user/my-artworks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUploadedArtworks(artworksRes.data.artworks || []);

      // Initialize artwork edits state
      const edits = {};
      (artworksRes.data.artworks || []).forEach((art) => {
        edits[art._id] = { title: art.title, price: art.price };
      });
      setArtworkEdits(edits);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  fetchUserProfile();
}, [setUploadedArtworks]);


  // --- Profile Update ---
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("location", location);
      if (profileImage) formData.append("profileImage", profileImage);

      const token = localStorage.getItem("token");
      const res = await api.put("/users/update", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setUserProfile(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Profile updated successfully!");
      setPreviewProfileImage(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // --- Upload Artwork ---
  const handleUploadArtwork = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);
      formData.append("title", e.target.title.value);
      formData.append("price", e.target.price.value);

      const token = localStorage.getItem("token");
      const res = await api.post("/artworks/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setUserProfile((prev) => ({
        ...prev,
        artworks: [...(prev.artworks || []), res.data.artwork],
      }));

      setUploadedArtworks((prev) => [...prev, res.data.artwork]);

      setArtworkEdits((prev) => ({
        ...prev,
        [res.data.artwork._id]: { title: res.data.artwork.title, price: res.data.artwork.price },
      }));

      alert("Painting uploaded successfully!");
      e.target.reset();
      setPreviewArtwork(null);
    } catch (err) {
      console.error("Error uploading painting:", err);
      alert("Failed to upload painting");
    }
  };

  // --- Edit Artwork ---
  const handleArtworkChange = (artId, field, value) => {
    setArtworkEdits((prev) => ({
      ...prev,
      [artId]: { ...prev[artId], [field]: value },
    }));
  };

  const handleSaveArtwork = async (artId) => {
    try {
      const { title, price } = artworkEdits[artId];
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/artworks/${artId}`,
        { title, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserProfile((prev) => ({
        ...prev,
        artworks: prev.artworks.map((a) => (a._id === artId ? res.data.artwork : a)),
      }));

      setUploadedArtworks((prev) =>
        prev.map((a) => (a._id === artId ? res.data.artwork : a))
      );

      alert("Artwork updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update artwork");
    }
  };

  // --- Delete Artwork ---
  const handleDeleteArtwork = async (artId) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/artworks/${artId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserProfile((prev) => ({
        ...prev,
        artworks: prev.artworks.filter((a) => a._id !== artId),
      }));

      setUploadedArtworks((prev) => prev.filter((a) => a._id !== artId));
      setArtworkEdits((prev) => {
        const copy = { ...prev };
        delete copy[artId];
        return copy;
      });

      alert("Artwork deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete artwork");
    }
  };

  if (!userProfile) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  const profileImgUrl =
    previewProfileImage
      ? URL.createObjectURL(previewProfileImage)
      : userProfile.profileImage
      ? userProfile.profileImage.startsWith("http")
        ? userProfile.profileImage
        : `http://localhost:4000${userProfile.profileImage}`
      : "https://via.placeholder.com/150";

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Welcome, {userProfile.name} 🎨</h2>

      {/* Profile Section */}
      <div className="row mb-5 align-items-center profile-header">
        <div className="col-md-4 text-center">
          <label htmlFor="profileUpload">
            <img
              src={profileImgUrl}
              alt={userProfile.name}
              className="rounded-circle shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover", cursor: "pointer" }}
            />
          </label>
          <input
            id="profileUpload"
            type="file"
            className="d-none"
            accept="image/*"
            onChange={(e) => {
              setProfileImage(e.target.files[0]);
              setPreviewProfileImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="col-md-8">
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Location:</strong> {location || "Not set"}</p>
          <p><strong>Bio:</strong> {bio || "No bio added yet"}</p>
        </div>
      </div>

      {/* Edit Profile */}
      <div className="row mb-4">
        <h4>Edit Profile</h4>
        <form onSubmit={handleProfileUpdate} className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                setProfileImage(e.target.files[0]);
                setPreviewProfileImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Bio</label>
            <input
              type="text"
              className="form-control"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your location"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Upload Artwork */}
      <div className="row mb-4">
        <h4>Upload Your Paintings</h4>
        <form onSubmit={handleUploadArtwork} className="row g-3">
          <div className="col-md-4">
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              required
              onChange={(e) => setPreviewArtwork(e.target.files[0])}
            />
          </div>
          <div className="col-md-4">
            <input type="text" name="title" className="form-control" placeholder="Enter painting title" required />
          </div>
          <div className="col-md-4">
            <input type="number" name="price" className="form-control" placeholder="Enter price" required />
          </div>

          {/* Artwork preview */}
          {previewArtwork && (
            <div className="col-12 text-center mb-3">
              <p>Preview:</p>
              <img
                src={URL.createObjectURL(previewArtwork)}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          )}

          <div className="col-12">
            <button type="submit" className="btn btn-success">Upload Painting</button>
          </div>
        </form>
      </div>

      {/* Display Artworks */}
      <div className="row mt-4">
        <h4>Your Paintings</h4>
        <div className="d-flex flex-wrap gap-3">
   {uploadedArtworks && uploadedArtworks.length > 0 ? (
  uploadedArtworks.map((art) => {

              const artUrl = art.image.startsWith("http") ? art.image : `http://localhost:4000${art.image}`;
              return (
                <div key={art._id} className="text-center border p-2" style={{ borderRadius: "8px" }}>
                  <img
                    src={artUrl}
                    alt={art.title}
                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                  />

                  <input
                    type="text"
                    className="form-control mt-2"
                    value={artworkEdits[art._id]?.title || ""}
                    onChange={(e) => handleArtworkChange(art._id, "title", e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control mt-2"
                    value={artworkEdits[art._id]?.price || ""}
                    onChange={(e) => handleArtworkChange(art._id, "price", e.target.value)}
                  />

                  <button
                    onClick={() => handleSaveArtwork(art._id)}
                    className="btn btn-primary mt-2 w-100"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => handleDeleteArtwork(art._id)}
                    className="btn btn-danger mt-2 w-100"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ) : (
            <p>No paintings uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
