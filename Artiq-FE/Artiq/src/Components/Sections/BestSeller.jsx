import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import ArtCard from '../Artcard'; // Import ArtCard component
import '../../Styles/Gallery.css';

const BestSeller = () => {
  const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useContext(GlobalContext);

  const bestSellers = [
    { id: 101, image: 'src/assets/images/Shop10_600x.webp', title: 'Golden Horizon', price: 180, size: '24x36', description: 'A stunning golden sunset.' },
    { id: 102, image: 'src/assets/images/Shop12_600x.webp', title: 'Mystic Falls', price: 210, size: '30x40', description: 'Mystical waterfall and fog.' },
    { id: 103, image: 'src/assets/images/Shop13_600x.webp', title: 'Mystic Falls', price: 210, size: '30x40', description: 'Mystical waterfall and fog.' }
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
      <h6 className="section-title mt-3 mb-3">Best Sellers</h6>
      <div className="gallery-grid grid">
        {bestSellers.map((art) => (
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

export default BestSeller;
