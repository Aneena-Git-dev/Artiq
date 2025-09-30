import React from 'react';
import PropTypes from 'prop-types';

const ArtCard = ({ art, addToCart, addToWishlist }) => {
  return (
    <div className="art-card">
      <img src={art.image} alt={art.title} className="art-img" />
      <h3 className="art-title">{art.title}</h3>
      <p className="art-price">₹{art.price}</p>
      <div className="card-buttons">
        <button className="add-btn" onClick={() => addToCart(art)}>
          <i className="bi bi-cart-plus-fill"></i> Add to Cart
        </button>
        <button className="love-btn" onClick={() => addToWishlist(art)}>
          <i className="bi bi-heart-fill"></i> Love
        </button>
      </div>
    </div>
  );
};

ArtCard.propTypes = {
  art: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  addToWishlist: PropTypes.func.isRequired,
};

export default ArtCard;
