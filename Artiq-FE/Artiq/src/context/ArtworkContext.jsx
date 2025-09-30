import React, { createContext, useEffect, useState } from 'react';

export const ArtworkContext = createContext();

export const ArtworkProvider = ({ children }) => {
  const [uploadedArtworks, setUploadedArtworks] = useState(() => {
    const stored = localStorage.getItem('artworks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('artworks', JSON.stringify(uploadedArtworks));
  }, [uploadedArtworks]);

  return (
    <ArtworkContext.Provider value={{ uploadedArtworks, setUploadedArtworks }}>
      {children}
    </ArtworkContext.Provider>
  );
};
