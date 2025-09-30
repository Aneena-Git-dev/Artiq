
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';

const PublicGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // Step 1: Search paintings with images
        const { data } = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting&hasImages=true'
        );

        const ids = data.objectIDs.slice(0, 6); // Limit for now

        // Step 2: Get artwork details for selected IDs
        const artData = await Promise.all(
          ids.map(async (id) => {
            const res = await axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return res.data;
          })
        );

        setArtworks(artData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching public artworks", error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Explore Public Artworks</h2>
      <div className="row">
        {artworks.map((art, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={art.primaryImageSmall || 'https://via.placeholder.com/300'} />
              <Card.Body>
                <Card.Title>{art.title}</Card.Title>
                <Card.Text>
                  <strong>Artist:</strong> {art.artistDisplayName || 'Unknown'}<br />
                  <strong>Year:</strong> {art.objectDate || 'N/A'}<br />
                  <strong>Medium:</strong> {art.medium || 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicGallery;
