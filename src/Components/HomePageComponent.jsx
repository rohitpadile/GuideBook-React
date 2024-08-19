import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Carousel, Button } from 'react-bootstrap'; // Import the Carousel and Button components
import '../css/HomePageComponentCss.css'; // Import the updated CSS file
import { useNavigate } from 'react-router-dom';

const HomePageComponent = () => {
  const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/colleges');
  };

  return (
    <div className="home-page">
      {/* Flex container to align content and poster side by side */}
      <div className="home-page-side-by-side-container">
        {/* Poster-like container for content */}
        <div className="home-page-content-poster">
          <div className="carousel-caption-below">
            <h3>Welcome to GuidebookX</h3>
            <p>Ultimate platform for college students to interact and take the insights</p>
            <Button variant="primary" className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </Button>
            <p className="or-separator">OR</p>
            <p className="mentor-apply-link">
              <a href="https://forms.gle/nXcJj9qbZaUBYSVy8" target="_blank" rel="noopener noreferrer">
                Apply For Student Mentor
              </a>
            </p>
          </div>
        </div>
        
        {/* Poster image */}
        {/* <div className="home-page-poster-container">
          <img
            className="home-page-poster"
            src={`${BASE_URL}bookASessionToday.png`}
            alt="Book a Session Poster"
          />
        </div> */}
      </div>

      {/* Carousels for new posters */}
      <div className="home-page-carousel-section">
        <Carousel interval={3000}> {/* Set the interval for auto-sliding */}
          <Carousel.Item>
            <img
              className="d-block w-100 home-page-carousel-image"
              src={`${BASE_URL}howItWorks-booking.png`}
              alt="How It Works - Booking Poster"
            />
            <Carousel.Caption>
              {/* <h3>How It Works</h3> */}
              <p>Swipe to learn more about how our platform works.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 home-page-carousel-image"
              src={`${BASE_URL}3StepProcess.png`}
              alt="3 Step Process Poster"
            />
            <Carousel.Caption>
              {/* <h3>3 Step Process</h3> */}
              <p>Understand these 3 simple steps to get started.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Additional posters section */}
      <div className="home-page-fullscreen-posters">
        <div className="home-page-poster-container-full">
          <img
            className="home-page-poster-full"
            src={`${BASE_URL}aboutOurService.png`}
            alt="About Our Service Poster"
          />
        </div>
        <div className="home-page-poster-container-full">
          <img
            className="home-page-poster-full"
            src={`${BASE_URL}FAQs.png`}
            alt="FAQs Poster"
          />
        </div>
        <div className="home-page-poster-container-full">
          <img
            className="home-page-poster-full"
            src={`${BASE_URL}Contact.png`}
            alt="Contact Poster"
          />
        </div>
      
      </div>
    </div>
  );
};

export default HomePageComponent;
