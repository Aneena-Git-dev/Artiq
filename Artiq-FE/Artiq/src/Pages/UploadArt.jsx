// src/Pages/UploadArt.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/UploadArt.css";
import { GlobalContext } from "../context/GlobalContext";
import api from "../api";

const UploadArt = () => {
  const { uploadedArtworks, setUploadedArtworks, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || (!imageFile && !imageUrl) || !price) {
      alert("Please provide Title, Price, and either an Image file or Image URL.");
      return;
    }

    if (!user) {
      alert("You must be logged in to upload artwork.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("imageUrl", imageUrl);
      }

      const response = await api.post("/artworks/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const uploaded = response.data;

      const newArt = {
        id: uploaded._id,
        title: uploaded.title,
        image: uploaded.image.startsWith("/uploads")
          ? `http://localhost:4000${uploaded.image}`
          : uploaded.image,
        price: uploaded.price,
        category: uploaded.category,
        description: uploaded.description,
        uploadedBy: user.username,
      };

      setUploadedArtworks([newArt, ...uploadedArtworks]);

      setTitle("");
      setImageFile(null);
      setImageUrl("");
      setPrice("");
      setCategory("");
      setDescription("");

      alert("Artwork uploaded successfully!");
      navigate("/profile"); // redirect to profile where paintings show
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload artwork.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-art container my-5">
      <h2 className="mb-4">Upload New Artwork</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Upload Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <label>OR Enter Image URL:</label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Artwork"}
        </button>
      </form>
    </div>
  );
};

export default UploadArt;
