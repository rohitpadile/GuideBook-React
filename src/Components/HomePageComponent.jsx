import React from 'react';
import '../css/HomePageComponentCss.css'; // Import the updated CSS file
import SideNavComponent from '../Components/SideNavigationComponent'; // Import the side navigation component

const HomePageComponent = () => {
  return (
    <div className="home-page">
      {/* <SideNavComponent /> Include the side navigation component */}

      <section className="home-page-hero-section">
        <div className="home-page-hero-content">
          <h1>Welcome to GuideBookX</h1>
          <p>Your ultimate guide to engineering education and exam preparation!</p>
          <a href="#services" className="home-page-btn-primary">Explore Services</a>
        </div>
      </section>

      <section id="services" className="home-page-services-section">
        <div className="container">
          <h2 className="animate__animated animate__fadeIn">Our Services</h2>
          <div className="home-page-service-card">
            <div className="home-page-service-icon animate__animated animate__fadeInUp">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <div className="home-page-service-info animate__animated animate__fadeInUp">
              <h3>Expert Tutoring</h3>
              <p>Personalized tutoring sessions with top students from Coep Technological University.</p>
            </div>
          </div>
          <div className="home-page-service-card">
            <div className="home-page-service-icon animate__animated animate__fadeInUp">
              <i className="fas fa-video"></i>
            </div>
            <div className="home-page-service-info animate__animated animate__fadeInUp">
              <h3>Online and Offline Sessions</h3>
              <p>Flexible options for one-on-one sessions via Zoom and offline meetings.</p>
            </div>
          </div>
          <div className="home-page-service-card">
            <div className="home-page-service-icon animate__animated animate__fadeInUp">
              <i className="fas fa-book"></i>
            </div>
            <div className="home-page-service-info animate__animated animate__fadeInUp">
              <h3>Comprehensive Study Materials</h3>
              <p>Access to curated study materials and exam preparation guides.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-testimonial-section animate__animated animate__fadeIn">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="home-page-testimonial-card">
            <div className="home-page-testimonial-text">
              <p>"GuideBook helped my child prepare for engineering entrance exams effectively. Highly recommended!"</p>
              <span>- Parent</span>
            </div>
          </div>
          <div className="home-page-testimonial-card">
            <div className="home-page-testimonial-text">
              <p>"The tutoring sessions were insightful and personalized. I saw significant improvement in my grades!"</p>
              <span>- Student</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-contact-section animate__animated animate__fadeIn">
        <div className="container">
          <h2>Contact Us</h2>
          <form className="home-page-contact-form">
            <div className="home-page-form-group">
              <input type="text" className="home-page-form-control" placeholder="Your Name" />
            </div>
            <div className="home-page-form-group">
              <input type="email" className="home-page-form-control" placeholder="Your Email" />
            </div>
            <div className="home-page-form-group">
              <textarea className="home-page-form-control" rows="4" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="home-page-btn-primary-submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePageComponent;
