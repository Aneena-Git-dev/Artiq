import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../Styles/Home.css';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.staggered-row, .animated-image');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
  <>
    <div className="home-grid-banner-section py-5">
      <div className="color-spill-background"></div>

      <Container fluid className="px-3 px-md-5 text-start position-relative">
        {/* Intro Title */}
        <Row className="mb-5">
          <Col xs={12} md={10} lg={6} className="mx-auto text-center">
            <h4 className="display-6">
              Being creative is not a hobby, it is a way of life for every artist
            </h4>
          </Col>
        </Row>

        {/* Banner Images */}
        <Row className="gx-4 gy-4 justify-content-center">
          <Col xs={12} md={6} lg={5} className="position-relative">
            <a href="/collections/best-sellings">
              <img
                src="src/assets/images/grid01_f082623b-bb96-43a2-811f-854fbc047902.webp"
                alt="The modern art gallery"
                className="img-fluid rounded w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
              <div className="banner-content position-absolute bottom-0 start-0 p-3 text-white">
                <h6 className="text-uppercase small">Explore Art</h6>
                <h5 className="fw-semibold">The modern art gallery</h5>
              </div>
            </a>
          </Col>

          <Col xs={12} md={6} lg={5} className="position-relative">
            <a href="/collections/new-arrival">
              <img
                src="src/assets/images/grid02_ec44ff22-74ff-403d-9ae0-f13f2413d84a.webp"
                alt="Famous artist paintings"
                className="img-fluid rounded w-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </a>
          </Col>
        </Row>

        {/* Staggered Sections */}
        <div className="staggered-art-section mt-5">
          {/* Section 1 */}
          <Row className="align-items-center staggered-row mb-5">
            <Col md={6}>
              <img
                src="src/assets/images/grid03_031ab2db-9576-4660-b395-16aae2b0d385.webp"
                alt="Digital Art"
                className="img-fluid rounded w-100"
                style={{ maxHeight: '450px', objectFit: 'cover' }}
              />
            </Col>
            <Col md={6}>
              <h3 className='art-heading' style={{fontSize:'3rem'}}>Digital Art</h3>
              <p className='art-para' style={{fontSize:'1.3rem'}}>Fusion of technology and imagination, redefining artistic expression.</p>
            </Col>
          </Row>

          {/* Section 2 */}
          <Row className="align-items-center flex-column-reverse flex-md-row staggered-row mb-5">
            <Col md={6}>
              <h3 className='art-heading' style={{fontSize:'3rem'}}>Creative Art</h3>
              <p className='art-para' style={{fontSize:'1.3rem'}}>Free-flowing expressions breaking traditional boundaries of form and meaning.</p>
            </Col>
            <Col md={6}>
              <img
                src="src/assets/images/grid04.webp"
                alt="Creative Art"
                className="img-fluid rounded w-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </Col>
          </Row>

          {/* Section 3 */}
          <Row className="align-items-center staggered-row mb-5">
            <Col md={6}>
              <img
                src="src/assets/images/grid05_9c76563b-22d5-4f80-bbd1-1aa9ed68b7b6.webp"
                alt="Modern Art"
                className="img-fluid rounded "
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </Col>
            <Col md={6}>
              <h3 className='art-heading' style={{fontSize:'3rem'}}>Modern Art</h3>
              <p className='art-para' style={{fontSize:'1.3rem'}}>Bold strokes and abstract visions echoing the modern soul.</p>
            </Col>
          </Row>

          {/* Section 4 */}
          <Row className="align-items-center flex-column-reverse flex-md-row staggered-row mb-5">
            <Col md={6}>
              <h3 className='art-heading' style={{fontSize:'3rem'}}>Modern Paintings</h3>
              <p className='art-para' style={{fontSize:'1.3rem'}}>Colors collide, emotions spill — a canvas of the present age.</p>
            </Col>
            <Col md={6}>
              <img
                src="src/assets/images/grid06.webp"
                alt="Modern Paintings"
                className="img-fluid rounded"
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </div>

        {/* Call to Action */}
        <Row className="mt-5 text-center">
          <Col xs={12} className="mb-4">
            <p className="lead fw-semibold reveal">
              Dive into the world of visual expression curated just for you.
            </p>
          </Col>

          {/* Animated Art Previews */}
          <Row className="gx-4 gy-4 justify-content-center mb-5">
            {[1, 2, 3].map((num) => (
              <Col key={num} xs={12} md={4} className="animated-image">
                <img
                  src={`src/assets/images/blog0${num}.webp`}
                  alt={`Inspiring Art ${num}`}
                  className="img-fluid rounded w-100"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </Col>
            ))}
          </Row>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.5 }}
  className="text-center mt-4"
>
  {/* <Link to="/profile">
    <Button
      variant="outline-light"
      size="lg"
      className="rounded-pill px-4 py-2"
      style={{  fontSize: "1.2rem", background: "pink", border: "none" }}
    >
      🖌️ Become an Artist

    </Button>
  </Link> */}
</motion.div>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Home;
 