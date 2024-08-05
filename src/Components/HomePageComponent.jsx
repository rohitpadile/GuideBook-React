import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Carousel, Button } from 'react-bootstrap'; // Import the Carousel component
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
      
      <div className="carousel-caption-below">
        <h3>Welcome to GuideBookX</h3>
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
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${BASE_URL}logonameblack1.jpg`}
            alt="Invite Poster"
          />
        </Carousel.Item>
        {/* Add more Carousel.Items here if needed */}
      </Carousel>
    </div>
  );
};

export default HomePageComponent;
