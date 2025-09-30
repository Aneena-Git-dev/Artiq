import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/ArtDetail.css';

const ArtDetail = () => {
  const { state: art } = useLocation();

  return (
    <section className="art-detail container">
      <div className="art-detail-content">
        <img src={art.image} alt={art.title} className="art-detail-img" />
        <div className="art-detail-text">
          <h2>{art.title}</h2>
          <p><strong>Price:</strong> ${art.price}</p>
          <p><strong>Size:</strong> {art.size}</p>
          <p><strong>Description:</strong> {art.description}</p>
          <button className="add-btn">Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default ArtDetail;
