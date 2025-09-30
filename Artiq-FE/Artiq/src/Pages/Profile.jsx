// src/pages/Profile.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "../context/GlobalContext";
import { ArtworkContext } from "../context/ArtworkContext";
import api from "../api";
import "../Styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext);
  const { uploadedArtworks, addArtwork } = useContext(ArtworkContext);

  const defaultProfileImage =
    "https://wowxwow.com/wp-content/uploads/2015/11/DVallejo-Blossom.jpg";

  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    image: defaultProfileImage,
  });

  // Artwork upload state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [artImage, setArtImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${user?.username}`);
        setProfile({
          ...res.data,
          image: res.data.image || defaultProfileImage,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Could not fetch profile. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user, navigate]);

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setProfile((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile.name || !profile.email) {
      toast.warn("Name and Email are required!");
      return;
    }
    try {
      await api.put(`/users/profile/${user?.username}`, profile);
      setUser({ ...user, ...profile }); // update context
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Could not update profile.");
    }
  };

  // Artwork preview
  useEffect(() => {
    if (artImage) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(artImage);
    } else {
      setPreviewUrl("");
    }
  }, [artImage]);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !category || !description || !dimensions || !artImage) {
      toast.error("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("dimensions", dimensions);
    formData.append("uploadedBy", user?.username);
    formData.append("image", artImage);

    try {
      const res = await api.post("/artworks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      addArtwork(res.data); // update context
      setTitle("");
      setPrice("");
      setCategory("");
      setDescription("");
      setDimensions("");
      setArtImage(null);
      setPreviewUrl("");
      toast.success("Artwork uploaded successfully!");
    } catch (err) {
      console.error("Error uploading artwork:", err);
      toast.error("Could not upload artwork.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;

  // Filter artworks uploaded by this user
  const userArtworks =
    uploadedArtworks?.filter((art) => art.uploadedBy === user?.username) || [];

  return (
    <div className="profile-page">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="profile-container">
        {/* Tabs */}
        <div className="tab-buttons mb-3">
          <button
            className={tab === "profile" ? "active" : ""}
            onClick={() => setTab("profile")}
          >
            My Profile
          </button>
          <button
            className={tab === "upload" ? "active" : ""}
            onClick={() => setTab("upload")}
          >
            Upload Artwork
          </button>
          <button className="btn btn-danger ms-3" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="profile-section">
            <div className="profile-img-wrapper mb-3">
              <input
                type="file"
                id="profilePicInput"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
              <img
                src={profile.image}
                alt="Profile"
                className="profile-img"
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                title="Click to change profile picture"
              />
            </div>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="form-control mb-2"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="form-control mb-2"
              placeholder="Email"
            />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleProfileChange}
              className="form-control mb-2"
              placeholder="Location"
            />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              className="form-control mb-2"
              rows="3"
              placeholder="Bio"
            />
            <button className="btn btn-outline-primary" onClick={handleSaveProfile}>
              Save Profile
            </button>

            {/* Display info card */}
            <div className="card mt-4 p-3 shadow">
              <h5>{profile.name}</h5>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Location:</strong> {profile.location || "N/A"}
              </p>
              <p>
                <strong>Bio:</strong> {profile.bio || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {tab === "upload" && (
          <div className="upload-container">
            <h4>Upload New Artwork</h4>
            <form onSubmit={handleUploadSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control mb-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control mb-2"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control mb-2"
                rows="2"
              />
              <input
                type="text"
                placeholder="Dimensions (e.g., 30x40 cm)"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="form-control mb-2"
              />
              <input
                type="file"
                onChange={(e) => setArtImage(e.target.files[0])}
                className="form-control mb-2"
                accept="image/*"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="preview-img mb-2" />
              )}
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </form>

            {/* Show uploaded artworks */}
            <div className="mt-4">
              <h5>My Artworks</h5>
              <div className="row">
                {userArtworks.length > 0 ? (
                  userArtworks.map((art, idx) => (
                    <div className="col-md-3 mb-3" key={idx}>
                      <div className="card p-2 shadow">
                        <img src={art.image} alt={art.title} className="img-fluid" />
                        <p className="mt-1">{art.title}</p>
                        <p>${art.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No artworks uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
