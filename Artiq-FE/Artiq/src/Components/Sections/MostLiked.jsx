import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import ArtCard from '../Artcard'; // Import ArtCard component
import '../../Styles/Gallery.css';

const MostLiked = () => {
  const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useContext(GlobalContext);

  const likedArtworks = [
    { id: 301, image: 'src/assets/images/Shop04_600x.webp', title: 'Ethereal Glow', price: 170 },
    { id: 302, image: 'src/assets/images/Shop06_600x.webp', title: 'Celestial Dance', price: 200 },
    { id: 303, image: 'src/assets/images/Shop07_600x.webp', title: 'Celestial Dance', price: 200 }
  ];

  const addToCart = (art) => {
    if (!cartItems.find(item => item.id === art.id)) {
      setCartItems([...cartItems, art]);
    }
  };

  const addToWishlist = (art) => {
    if (!wishlistItems.find(item => item.id === art.id)) {
      setWishlistItems([...wishlistItems, art]);
    }
  };

  return (
    <section className="section-container">
      <h2 className="section-title">Most Liked</h2>
      <div className="gallery-grid grid">
        {likedArtworks.map((art) => (
          <ArtCard
            key={art.id}
            art={art}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default MostLiked;
