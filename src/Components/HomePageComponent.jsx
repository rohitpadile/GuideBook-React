import React from 'react';
import '../App.css'; // Ensure this path is correct based on your file structure
// import astronautImage from '../assets/astronaut.png'; // Replace with your own image path
// import waveImage from '../assets/wave.png'; // Replace with your own image path

const HomePageComponent = () => {
    return (
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to GuideBook</h1>
            <p>Your ultimate guide to engineering education and exam preparation!</p>
            <a href="#services" className="btn btn-primary">Explore Services</a>
          </div>
        </section>
  
        <section id="services" className="services-section">
          <div className="container">
            <h2 className="animate__animated animate__fadeIn">Our Services</h2>
            <div className="service-card">
              <div className="service-icon animate__animated animate__fadeInUp">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div className="service-info animate__animated animate__fadeInUp">
                <h3>Expert Tutoring</h3>
                <p>Personalized tutoring sessions with top students from Coep Technological University.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon animate__animated animate__fadeInUp">
                <i className="fas fa-video"></i>
              </div>
              <div className="service-info animate__animated animate__fadeInUp">
                <h3>Online and Offline Sessions</h3>
                <p>Flexible options for one-on-one sessions via Zoom and offline meetings.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon animate__animated animate__fadeInUp">
                <i className="fas fa-book"></i>
              </div>
              <div className="service-info animate__animated animate__fadeInUp">
                <h3>Comprehensive Study Materials</h3>
                <p>Access to curated study materials and exam preparation guides.</p>
              </div>
            </div>
          </div>
        </section>
  
        <section className="testimonial-section animate__animated animate__fadeIn">
          <div className="container">
            <h2>What Our Users Say</h2>
            <div className="testimonial-card">
              <div className="testimonial-text">
                <p>"GuideBook helped my child prepare for engineering entrance exams effectively. Highly recommended!"</p>
                <span>- Parent</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                <p>"The tutoring sessions were insightful and personalized. I saw significant improvement in my grades!"</p>
                <span>- Student</span>
              </div>
            </div>
          </div>
        </section>
  
        <section className="contact-section animate__animated animate__fadeIn">
          <div className="container">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </section>
      </div>
    );
  };
  
  export default HomePageComponent;