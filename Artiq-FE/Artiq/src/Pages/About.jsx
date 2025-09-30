import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/About.css';
import { FaPaintBrush } from 'react-icons/fa';
import artGalleryVideo from '../assets/videos/vecteezy_young-woman-admiring-artwork-in-a-modern-gallery-showcasing_55261057.mp4';



const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="about-page">
      {/* Hero Section with Background Image */}
      <div className="about-hero-bg" style={{height:'400px'}}>
        <div className="about-hero-content" data-aos="fade-down">
          <h1>Discover the World of Artiq</h1>
          <p>Where digital creativity meets inspiration.</p>
        </div>
      </div>

      {/* Staggered Content Sections */}
      <div className="about-staggered container">
        <div className="about-row" data-aos="fade-right">
          <img src="src/assets/images/grid01.webp" alt="Artist 1" className="about-img-staggered" />
          <div className="about-text">
            <h2>Connecting Artists Globally</h2>
            <p>We provide a platform for artists across the world to showcase their talents and build a strong community of digital creators.</p>
          </div>
        </div>

        <div className="about-row reverse" data-aos="fade-left">
          <img src="src/assets/images/grid02.webp" alt="Artist 2" className="about-img-staggered" />
          <div className="about-text">
            <h2>Innovation Through Digital Art</h2>
            <p>We embrace technology and creativity to redefine how art is created, viewed, and appreciated.</p>
          </div>
        </div>
      </div>

      {/* Full-Width Background Image Section */}
      <div className="about-fullbg-section" data-aos="zoom-in">
  <video className="background-video" autoPlay muted loop playsInline>
 
<source src={artGalleryVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="about-fullbg-overlay">
    <h2>Immersive Digital Experiences</h2>
    <p>Where creativity meets technology.</p>
  </div>
</div>



      {/* Final Image & Points Section */}
      <div className="about-final container" data-aos="fade-up">
        <div className="about-final-inner">
          <img src="src/assets/images/grid03.webp" alt="Creative Process" className="about-final-img" />
          <div className="about-final-text">
            <h2>Why Artiq?</h2>
            <p>Here are some reasons artists love our platform:</p>
            <ul>
              <li><FaPaintBrush className="icon" /> Trusted by thousands of digital artists</li>
              <li><FaPaintBrush className="icon" /> Easy uploading and selling process</li>
              <li><FaPaintBrush className="icon" /> High-quality artwork exposure</li>
              <li><FaPaintBrush className="icon" /> Active community and support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
