import React from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter } from 'react-icons/fa6';
import '../Styles/Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content container d-flex justify-content-between align-items-center py-3">
        <div className="copyright">
          &copy; {new Date().getFullYear()} Digital Art Gallery. All rights reserved.
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <FaPinterestP />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
          </div>

          {/* Scroll to top image */}
          <div className="scroll-to-top" onClick={scrollToTop}>
            <img
              src="src/assets/images/scrolltop.webp"
              alt="Scroll to top"
              className="scroll-img"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
