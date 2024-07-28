import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Carousel, Button } from 'react-bootstrap'; // Import the Carousel component
import '../css/HomePageComponentCss.css'; // Import the updated CSS file
import { useNavigate } from 'react-router-dom';
// Define the constant for the base URL

const HomePageComponent = () => {

  const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/colleges');
  };

  return (
    <div className="home-page">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${BASE_URL}invitePoster.jpg`}
            alt="Invite Poster"
          />
        </Carousel.Item>
        {/* Add more Carousel.Items here if needed */}
      </Carousel>
      <div className="carousel-caption-below">
        <h3>Welcome to GuideBookX</h3>
        <p>The Ultimate platform for college students to interact and take the insights</p>
        <Button variant="primary" className="get-started-button" onClick={handleGetStartedClick}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HomePageComponent;
