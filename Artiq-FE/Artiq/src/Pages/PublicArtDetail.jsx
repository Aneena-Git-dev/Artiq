// src/Pages/PublicArtDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import api from '../api';
import '../Styles/PublicArtDetail.css';

const PublicArtDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { uploadedArtworks, setUploadedArtworks, user } = useContext(GlobalContext);

  const [art, setArt] = useState(location.state || null);
  const [loading, setLoading] = useState(!art);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (!art) {
      const localArt = uploadedArtworks.find(a => a._id === id);
      if (localArt) {
        setArt(localArt);
        setLoading(false);
      } else {
        api.get(`/artworks/${id}`)
          .then(res => {
            setArt(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }
    } else {
      setFormData({
        title: art.title || '',
        price: art.price || '',
        category: art.category || '',
        description: art.description || '',
        image: art.image || ''
      });
    }
  }, [id, art, uploadedArtworks]);

  const handleDelete = async () => {
    if (!user) return alert('Please login to delete artwork.');
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      await api.delete(`/artworks/${id}`);
      setUploadedArtworks(prev => prev.filter(a => a._id !== id));
      alert('Artwork deleted successfully');
      navigate('/gallery');
    } catch (err) {
      console.error(err);
      alert('Failed to delete artwork');
    }
  };

  const handleShare = () => {
    const shareURL = window.location.href;
    if (navigator.share) {
      navigator.share({ title: art.title, url: shareURL }).catch(err => console.error('Share failed:', err));
    } else {
      navigator.clipboard.writeText(shareURL);
      alert('Link copied to clipboard!');
    }
  };

  const handleEditToggle = () => setEditMode(prev => !prev);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/artworks/${id}`, formData);
      setArt(response.data.artwork);
      setUploadedArtworks(prev => prev.map(a => a._id === id ? response.data.artwork : a));
      setEditMode(false);
      alert('Artwork updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update artwork');
    }
  };

  if (loading || !art) return <div className="container text-center my-5">Loading artwork details...</div>;

  return (
    <div className="container public-art-detail my-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>← Back to Gallery</button>

      <div className="row">
        <div className="col-md-6">
          <img src={art.image} alt={art.title} className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-6">
          {editMode ? (
            <div className="edit-form">
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control mb-2" placeholder="Title" />
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control mb-2" placeholder="Price" />
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-control mb-2" placeholder="Category" />
              <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control mb-2" placeholder="Description" />
              <input type="text" name="image" value={formData.image} onChange={handleChange} className="form-control mb-2" placeholder="Image URL" />
              <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={handleEditToggle}>Cancel</button>
            </div>
          ) : (
            <>
              <h2 className="mb-3">{art.title}</h2>
              <p><strong>Artist:</strong> {art.uploadedBy?.name || 'Unknown'}</p>
              <p><strong>Category:</strong> {art.category || 'N/A'}</p>
              <p><strong>Description:</strong> {art.description || 'No description'}</p>
              <h4 className="text-success">₹{art.price}</h4>
              <div className="mt-3">
                <button className="btn btn-primary me-2" onClick={handleShare}>
                  <i className="bi bi-share-fill"></i> Share Artwork
                </button>
                {user && art.uploadedBy?._id === user._id && (
                  <>
                    <button className="btn btn-warning me-2" onClick={handleEditToggle}>
                      <i className="bi bi-pencil-fill"></i> Edit Artwork
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      <i className="bi bi-trash-fill"></i> Delete Artwork
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicArtDetail;
