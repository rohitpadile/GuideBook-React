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
      <div>
      <h3>Notice: The site will shut temporarily due to low funds</h3>
      </div>
      
      {/* Problems and Confusion */}
      {/* <div className="home-page-problems-section">
        <h2>Facing Problems with Stream Selection?</h2>
        <p>
          Are you a 10th or 12th class student confused about what to pursue? Struggling between your interests and your parents' expectations to take up PCM or PCB? 
          You’re not alone. The transition from school to college can be overwhelming, but our experienced guides are here to help. They’ve been through the same journey and can provide clarity on your options.
        </p>
        <h2>College and Branch Selection Dilemma?</h2>
        <p>
          For 12th class students, selecting the right college and branch can be daunting. Get insights from students who’ve already made these decisions and are thriving in their chosen fields. 
          Don’t let confusion stop you—book a session today and get personalized advice on choosing the right path for your future.
        </p>
        <Button className="get-started-button" onClick={handleGetStartedClick}>
          Book a Session Now
        </Button>
      </div> */}

      {/* Flex container to align content and poster side by side */}
      
      <div className="home-page-side-by-side-container">
        {/* Poster-like container for content */}
        <div className="home-page-content-poster">
          <div className="carousel-caption-below">
            
            <h3>GuidebookX</h3>
            <p>Connecting India's student community through 1:1 guided sessions!</p>
            <div className="button-group">
            <button className="mentor-apply-link" onClick={handleGetStartedClick}>
                Click here to book step by step
              </button>
            </div>
          </div>
          <br/>
          <p className="mentor-apply-link-1">
            <a 
              className="mentor-apply-link-1" 
              href="https://forms.gle/nXcJj9qbZaUBYSVy8" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Click here to Apply For Guide
            </a>
          </p>
          
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
          {/* <Carousel.Item>
            <img
              className="d-block w-100 home-page-carousel-image"
              src={`${BASE_URL}howItWorks-booking.png`}
              alt="How It Works - Booking Poster"
            />
            <Carousel.Caption>
              <p>Swipe to learn more about how our platform works.</p>
            </Carousel.Caption>
          </Carousel.Item> */}
          <Carousel.Item>
            <img
              className="d-block w-100 home-page-carousel-image"
              src={`${BASE_URL}3StepProcess.png`}
              alt="3 Step Process Poster"
            />
            {/* <Carousel.Caption>
              <p>Understand these 3 simple steps to get started.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>

      

      {/* Feedback Section */}
      <div className="home-page-feedback-section">
        <h2>What Students are Saying</h2>
        <div className="home-page-feedback-card">
          <p>
            "I was completely lost after 10th class. GuidebookX connected me with a student who went through the same confusion, 
            and they helped me figure out the best stream for me. Now, I’m confidently pursuing my dream career."
          </p>
          <p>- Arpit, class 10th student</p>
        </div>
        <div className="home-page-feedback-card">
          <p>
            "Choosing the right college felt impossible. GuidebookX introduced me to a guide who shared their experience in my dream branch, 
            and it gave me the confidence to make my decision."
          </p>
          <p>- Yash, class 12th student</p>
        </div>
      </div>

      {/* Additional posters section */}
      <div className="home-page-fullscreen-posters">
        {/* <div className="home-page-poster-container-full">
          <img
            className="home-page-poster-full"
            src={`${BASE_URL}aboutOurService.png`}
            alt="About Our Service Poster"
          />
        </div> */}
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
