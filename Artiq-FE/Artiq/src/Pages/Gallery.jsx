// src/Pages/Gallery.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Gallery.css";
import HeroSection from "../Components/HeroSection";
import { GlobalContext } from "../context/GlobalContext";
import api from "../api";

const Gallery = () => {
  const {
    uploadedArtworks,
    setUploadedArtworks,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    user,
  } = useContext(GlobalContext);

  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [commentText, setCommentText] = useState({});
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("");
  const [publicArtworks, setPublicArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editArtworkId, setEditArtworkId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const itemsPerPage = 3;
  const navigate = useNavigate();

  // ================= Fetch Backend Uploaded Artworks =================
  useEffect(() => {
    const fetchBackendArtworks = async () => {
      try {
        const response = await api.get("/artworks");
        const artworks = response.data.items.map((art) => ({
          id: art._id,
          title: art.title,
          image: `http://localhost:4000${art.image}`,
          price: art.price,
          description: art.description,
          uploadedBy: art.uploadedBy?.username || "Unknown",
          type: "uploaded",
        }));
        setUploadedArtworks(artworks);
      } catch (err) {
        console.error("Error fetching backend artworks:", err);
      }
    };
    fetchBackendArtworks();
  }, [setUploadedArtworks]);

  // ================= Fetch Public Artworks =================
  useEffect(() => {
    const fetchPublicArtworks = async () => {
      try {
        const response = await api.get(
          "https://api.artic.edu/api/v1/artworks"
        );
        const artworks = response.data.data.map((item, index) => ({
          id: `public-${item.id}`,
          image: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
          title: item.title,
          price: 100 + index * 10,
          size: "N/A",
          description: item.artist_title || "Untitled",
          type: "public",
        }));
        setPublicArtworks(artworks);
      } catch (err) {
        console.error("Error fetching public artworks:", err);
      }
    };
    fetchPublicArtworks();
  }, []);

  // ================= Combine All Artworks =================
  const combinedArtworks = [...uploadedArtworks, ...publicArtworks];

  // ================= Sorting =================
  const sortedArtworks = [...combinedArtworks].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    return 0;
  });

  // ================= Pagination =================
  const paginatedArtworks = sortedArtworks.slice(
    0,
    currentPage * itemsPerPage
  );

  // ================= Handlers =================
  const handleImageClick = (art) => {
    if (art.type === "uploaded") {
      navigate(`/user/${art.uploadedBy}`);
    } else {
      navigate(`/art/${art.id}`, { state: art });
    }
  };

  const addToCart = (art) => {
    if (!cartItems.find((item) => item.id === art.id)) {
      setCartItems([...cartItems, art]);
    }
  };

  const toggleWishlist = (art) => {
    const exists = wishlistItems.find((item) => item.id === art.id);
    if (exists) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== art.id));
    } else {
      setWishlistItems([...wishlistItems, art]);
    }
  };

  const deleteArtwork = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/artworks/${id}`);
      setUploadedArtworks(uploadedArtworks.filter((art) => art.id !== id));
    } catch (err) {
      console.error("Failed to delete artwork:", err);
      alert("Failed to delete artwork.");
    }
  };

  const startEdit = (art) => {
    setEditArtworkId(art.id);
    setEditTitle(art.title);
    setEditPrice(art.price);
  };

  const saveEdit = async (id) => {
    try {
  const token = localStorage.getItem("token");
  await api.put(
    `/artworks/${id}`,
    { title: editTitle, price: editPrice },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // Update local state directly
  setUploadedArtworks(
    uploadedArtworks.map((art) =>
      art.id === id ? { ...art, title: editTitle, price: editPrice } : art
    )
  );
  setEditArtworkId(null);
} catch (err) {
  console.error("Failed to update artwork:", err);
  alert("Failed to update artwork.");
}

  };

  // ================= Render =================
  return (
    <section className="gallery container">
      <HeroSection />

      <div className="gallery-header">
        <div className="view-toggle">
          <button
            onClick={() => setView("grid")}
            className={`toggle-btn ${view === "grid" ? "active" : ""}`}
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>
          <button
            onClick={() => setView("list")}
            className={`toggle-btn ${view === "list" ? "active" : ""}`}
          >
            <i className="bi bi-list-ul"></i>
          </button>
        </div>

        <div className="sort-box">
          <label htmlFor="sort">Sort: </label>
          <select
            id="sort"
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className={`gallery-grid ${view}`}>
        {paginatedArtworks.map((art) => (
          <div
            key={art.id}
            className={`art-card ${view === "list" ? "list" : ""}`}
            onClick={() => handleImageClick(art)}
          >
            <img src={art.image} alt={art.title} className="art-img" />

            <div className="hover-icons" onClick={(e) => e.stopPropagation()}>
              <button
                className="icon-btn"
                onClick={() =>
                  setLikes((prev) => ({
                    ...prev,
                    [art.id]: (prev[art.id] || 0) + 1,
                  }))
                }
                title="Like"
              >
                <i className="bi bi-heart-fill"></i>
                <span className="icon-count">{likes[art.id] || 0}</span>
              </button>

              <button
                className="icon-btn"
                onClick={() => {
                  const shareURL = `${window.location.origin}/art/${art.id}`;
                  if (navigator.share) {
                    navigator
                      .share({ title: art.title, url: shareURL })
                      .catch((err) =>
                        console.error("Share failed:", err)
                      );
                  } else {
                    navigator.clipboard.writeText(shareURL);
                    alert("Link copied to clipboard!");
                  }
                }}
                title="Share"
              >
                <i className="bi bi-share-fill"></i>
              </button>

              <button
                className="icon-btn"
                onClick={() =>
                  setShowCommentBox((prev) => ({
                    ...prev,
                    [art.id]: !prev[art.id],
                  }))
                }
                title="Comment"
              >
                <i className="bi bi-chat-dots-fill"></i>
              </button>

              {showCommentBox[art.id] && (
                <div className="comment-box">
                  <input
                    type="text"
                    value={commentText[art.id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [art.id]: e.target.value,
                      }))
                    }
                    placeholder="Write a comment..."
                    className="comment-input"
                  />
                  <button
                    className="comment-submit"
                    onClick={() => {
                      const newComment = commentText[art.id];
                      if (newComment.trim() !== "") {
                        setComments((prev) => ({
                          ...prev,
                          [art.id]: [...(prev[art.id] || []), newComment],
                        }));
                        setCommentText((prev) => ({ ...prev, [art.id]: "" }));
                      }
                    }}
                  >
                    Post
                  </button>
                  <div className="comment-list">
                    {(comments[art.id] || []).map((cmt, idx) => (
                      <p key={idx} className="comment-text">
                        • {cmt}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {editArtworkId === art.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Price"
                />
                <button onClick={() => saveEdit(art.id)}>Save</button>
                <button onClick={() => setEditArtworkId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="art-title">{art.title}</h3>
                <p className="art-price">₹{art.price}</p>

                {uploadedArtworks.find((item) => item.id === art.id) && user && (
                  <div className="card-buttons">
                    <button
                      className="edit-btn btn btn-sm btn-outline-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(art);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteArtwork(art.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="card-buttons">
              <button
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(art);
                }}
              >
                <i className="bi bi-cart-plus-fill"></i> Add to Cart
              </button>

              <button
                className={`wishlist-btn ${
                  wishlistItems.find((item) => item.id === art.id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(art);
                }}
              >
                {wishlistItems.find((item) => item.id === art.id) ? (
                  <>
                    <i className="bi bi-heart-fill"></i> Wishlisted
                  </>
                ) : (
                  <>
                    <i className="bi bi-heart"></i> Add to Wishlist
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentPage * itemsPerPage < sortedArtworks.length && (
        <div className="load-more text-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
