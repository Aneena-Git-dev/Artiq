import React from 'react';
import '../Styles/Contact.css';

function Contact() {
  return (
    <div className="contact-page container">
      <div className="contact-wrapper">
        {/* Left Side: Contact Info */}
        <div className="contact-info">
          <div className="info-box">
            <h4>📞 Phone</h4>
            <p>+91 8075210387</p>
          </div>
          <div className="info-box">
            <h4>📧 Email</h4>
            <p>contact@artiqaart.com</p>
          </div>
          <div className="info-box">
            <h4>📍 Address</h4>
            <p>Art Street, Gallery Road, Bangalore, India</p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Your Name:</label>
            <input type="text" name="name" placeholder="Enter your name" />

            <label htmlFor="email">Your Email:</label>
            <input type="email" name="email" placeholder="Enter your email" />

            <label htmlFor="message">Your Message:</label>
            <textarea name="message" rows="5" placeholder="Enter your message"></textarea>

            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
