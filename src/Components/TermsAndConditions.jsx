import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../css/TermsAndConditionsCss.css'; // Import the CSS file for this component

const TermsAndConditions = () => {
  return (
    <div className="terms-container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="terms-card card shadow-lg p-4">
            <h1 className="terms-card-title card-title text-center mb-3">Terms and Conditions</h1>
            <div className="terms-card-body card-body">
              {/* <h3 className="terms-heading">Introduction</h3>
              <p className="terms-paragraph">
                Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.
              </p> */}
              <h3 className="terms-heading">Session Booking</h3>
              <ul className="terms-paragraph list-group list-group-flush">
                <li className="list-group-item">Clients (Students) will book a Zoom Session with the Student Mentor by filling the Form on the Book Session button on each Student Profile.</li>
                <li className="list-group-item">Student Mentors, according to their availability in their academic schedule, will schedule the Zoom meeting or cancel the Zoom meeting.</li>
                <li className="list-group-item">An email will be sent to both the mentor and student about the confirmation of the session on their provided emails.</li>
                <li className="list-group-item">Students may or may not be available depending on their academic, co-curricular, and extra-curricular schedule. They may schedule the meeting as per their available timing or reject the session with a small message if they are busy anytime soon.</li>
                <li className="list-group-item">Mentors will verify that you are a college student by seeing the proof you provided. Then only will they schedule a session so that their time is not wasted.</li>
                <li className="list-group-item">You can only book one session at a time. After that, you will not be allowed to book another session for a certain period.</li>
                <li className="list-group-item">After a session has been scheduled, the company takes no responsibilities for how the meeting will go. It will depend upon how seriously the mentor guides you.</li>
              </ul>
              
              <p className="terms-paragraph mt-3">
                If you have any questions about these Terms, please contact us at HelpDesk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
