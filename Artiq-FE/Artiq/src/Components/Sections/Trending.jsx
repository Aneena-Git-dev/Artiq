import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import ArtCard from '../Artcard'; // Import ArtCard component
import '../../Styles/Gallery.css';

const Trending = () => {
  const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useContext(GlobalContext);

  const trendingArtworks = [
    { id: 201, image: 'src/assets/images/Shop14_600x.webp', title: 'Urban Pop', price: 130 },
    { id: 202, image: 'src/assets/images/Shop01_600x.webp', title: 'Color Burst', price: 150 },
    { id: 203, image: 'src/assets/images/Shop02_600x.webp', title: 'Color Burst', price: 150 },
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
      <h2 className="section-title">Trending Artworks</h2>
      <div className="gallery-grid grid">
        {trendingArtworks.map((art) => (
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

export default Trending;
