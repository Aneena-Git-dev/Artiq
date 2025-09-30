import React, { useEffect, useState } from "react";
import api from "../../api"; // your axios instance
import "../../Styles/ManageArtworks.css"

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [newArt, setNewArt] = useState({ title: "", price: "", image: null });

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/admin/artworks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtworks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addArtwork = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newArt.title);
      formData.append("price", newArt.price);
      if (newArt.image) formData.append("image", newArt.image);

      const token = localStorage.getItem("token");
      await api.post("/admin/artworks", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewArt({ title: "", price: "", image: null });
      fetchArtworks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArtwork = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admin/artworks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArtworks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <h3>Manage Artworks</h3>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Title"
          className="form-control"
          value={newArt.title}
          onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control"
          value={newArt.price}
          onChange={(e) => setNewArt({ ...newArt, price: e.target.value })}
        />
        <input
          type="file"
          className="form-control"
          onChange={(e) => setNewArt({ ...newArt, image: e.target.files[0] })}
        />
        <button className="btn btn-primary" onClick={addArtwork}>
          Add
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((a) => (
            <tr key={a._id}>
              <td>
                <img src={a.image} alt={a.title} width="50" />
              </td>
              <td>{a.title}</td>
              <td>{a.price}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteArtwork(a._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageArtworks;
