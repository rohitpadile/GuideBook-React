import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { getStudentProfile, getStudentBasicDetails } from '../Services/apiServiceAdmin'; // Adjust the import path as per your file structure
import BookSessionComponent from './BookSessionComponent'; // Import the BookSessionComponent

const StudentProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};
  const profilePhotoUrl = `/studentProfilePhotos/${student.studentMis}.jpg`;

  const [studentProfile, setStudentProfile] = useState(null);
  const [studentBasicDetails, setStudentBasicDetails] = useState(null);

  const [showBookSession, setShowBookSession] = useState(false); // State to manage popup visibility
  

  useEffect(() => {
    // Fetch student profile data when component mounts
    const fetchStudentProfile = async () => {
      try {
        const profileData = await getStudentProfile(student.studentMis);
        setStudentProfile(profileData);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    // Fetch student basic details when component mounts
    const fetchStudentBasicDetails = async () => {
      try {
        const basicDetails = await getStudentBasicDetails(student.studentMis);
        setStudentBasicDetails(basicDetails);
      } catch (error) {
        console.error('Error fetching student basic details:', error);
      }
    };

    if (student.studentMis) {
      fetchStudentProfile();
      fetchStudentBasicDetails();
    }
  }, [student.studentMis]);

  // const handleBookSessionClick = () => {
  //   navigate('/bookSession', { state: { student } });
  // };
  const handleBookSessionClick = () => {
    setShowBookSession(true); // Show the BookSessionComponent popup
  };
  
  if (!studentProfile || !studentBasicDetails) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="container mt-5">
      <div className="card student-profile-card mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-header student-profile-header d-flex justify-content-between align-items-center">
          <h4>Student Profile</h4>
          <button 
            className="btn btn-primary book-session-button"
            onClick={handleBookSessionClick}
          >
            Book Session
          </button>
        </div>
        <div className="card-body student-profile-body">
          <div className="row">
            <div className="col-md-3 text-center">
              <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '150px' }} />
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Basic Information</h5>
              <ul>
                <li>Name: {student.studentName}</li>
                <li>Branch: {studentBasicDetails.branch}</li>
                <li>Grade: {studentBasicDetails.grade}</li>
                <li>CET Percentile: {studentBasicDetails.cetPercentile}</li>
                <li>Class Type: {studentBasicDetails.classType}</li>
                <li>Language: {studentBasicDetails.languagesSpoken.join(', ')}</li>
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>About</h5>
              <ul>
                {studentProfile.studentProfileAboutSection.map((item, index) => (
                  <li key={index}>{item.about}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>City of Coaching</h5>
              <ul>
                {studentProfile.studentProfileCityOfCoaching.map((item, index) => (
                  <li key={index}>{item.cityOfCoaching}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Score Details</h5>
              <ul>
                {studentProfile.studentProfileExamScoreDetails.map((detail, index) => (
                  <li key={index}>{detail.scoreDetail}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Other Exam Scores</h5>
              <ul>
                {studentProfile.studentProfileOtherExamScoreDetails.map((exam, index) => (
                  <li key={index}>{exam.otherScoreDetail}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Academic Activities</h5>
              <ul>
                {studentProfile.studentProfileAcademicActivity.map((activity, index) => (
                  <li key={index}>{activity.activity}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Co-Curricular Activities</h5>
              <ul>
                {studentProfile.studentProfileCoCurricularActivity.map((activity, index) => (
                  <li key={index}>{activity.activity}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Extra-Curricular Achievements</h5>
              <ul>
                {studentProfile.studentProfileExtraCurricularActivity.map((achievement, index) => (
                  <li key={index}>{achievement.activity}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Tutoring Experience</h5>
              <ul>
                {studentProfile.studentProfileTutoringExperience.map((experience, index) => (
                  <li key={index}>{experience.experience}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>External Links</h5>
              <ul>
                {studentProfile.studentProfileExternalLink.map((link, index) => (
                  <li key={index}>
                    <a href={link.linkAddress} target="_blank" rel="noopener noreferrer">{link.linkName}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Display BookSessionComponent as a popup */}
          {showBookSession && (
            <div className="popup-background">
              <div className="popup">
                <BookSessionComponent student={student} onClose={() => setShowBookSession(false)} />
              </div>
            </div>
          )}


          <div className="card mt-4 zoom-card">
            <div className="card-body">
              <h5>Sessions Conducted</h5>
              <p>{studentProfile.studentProfileSessionsConducted}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
