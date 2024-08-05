import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/StudentProfileComponentCss.css'; //separately add css to avoid confusion
import { getStudentProfile, getStudentBasicDetails } from '../Services/apiServiceAdmin'; // Adjust the import path as per your file structure
import BookSessionComponent from './BookSessionComponent'; // Import the BookSessionComponent
import { S3_PROFILE_PHOTO_BASE_URL } from '../constants/s3url'; // Import the constant

const StudentProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};
  const profilePhotoUrl = `${S3_PROFILE_PHOTO_BASE_URL}${student?.studentWorkEmail}.jpg`;

  const [studentProfile, setStudentProfile] = useState(null);
  const [studentBasicDetails, setStudentBasicDetails] = useState(null);
  const [showBookSession, setShowBookSession] = useState(false); // State to manage popup visibility

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const profileData = await getStudentProfile(student.studentWorkEmail);
        setStudentProfile(profileData);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    const fetchStudentBasicDetails = async () => {
      try {
        const basicDetails = await getStudentBasicDetails(student.studentWorkEmail);
        setStudentBasicDetails(basicDetails);
      } catch (error) {
        console.error('Error fetching student basic details:', error);
      }
    };

    if (student?.studentWorkEmail) {
      fetchStudentProfile();
      fetchStudentBasicDetails();
    }
  }, [student?.studentWorkEmail]);

  const handleBookSessionClick = () => {
    setShowBookSession(true); // Show the BookSessionComponent popup
  };

  if (!studentProfile || !studentBasicDetails) {
    return <div>Loading...</div>; // Display a loading message while fetching data OR CUSTOM COMPANY GIF LIKE LINKEDIN FOES
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
            <div className="col-md-4 text-center">
              <div className="student-info-card">
                {/* Single card for profile photo, name, and branch */}
                <div className="profile-info-card">
                  <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid rounded-circle profile-photo" />
                  <h5 className="student-name mt-3 student-name-unique">{student?.studentName}</h5>
                  <p className="student-branch">{studentBasicDetails?.branch}</p>
                </div>
                {/* Sessions conducted number below the small card */}
                <div className="sessions-conducted mt-4">
                  <h5>Sessions Conducted</h5>
                  <p className="big-number">{studentProfile?.studentProfileSessionsConducted}</p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Basic Information</h5>
                  <ul>
                    <li>Grade:      {studentBasicDetails?.grade}</li>
                    <li>Exam Score: {studentBasicDetails?.cetPercentile}</li>
                    <li>Class Type: {studentBasicDetails?.classType}</li>
                    <li>Language:   {studentBasicDetails?.languagesSpoken?.join(', ')}</li>
                    {/* <li>Category:   {studentBasicDetails?.category}</li> */}
                    <li>College:    {studentBasicDetails?.college}</li>
                  </ul>
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>About</h5>
                  <ul>
                    {studentProfile?.studentProfileAboutSection?.map((item, index) => (
                      <li key={index}>{item?.about}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>City of Coaching</h5>
                  <ul>
                    {studentProfile?.studentProfileCityOfCoaching?.map((item, index) => (
                      <li key={index}>{item?.cityOfCoaching}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Score Details</h5>
                  <ul>
                    {studentProfile?.studentProfileExamScoreDetails?.map((detail, index) => (
                      <li key={index}>{detail?.scoreDetail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Other Exam Scores</h5>
                  <ul>
                    {studentProfile?.studentProfileOtherExamScoreDetails?.map((exam, index) => (
                      <li key={index}>{exam?.otherScoreDetail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Activity and Achievements</h5>
                  <ul>
                    {studentProfile?.studentProfileActivityAndAchievements?.map((activity, index) => (
                      <li key={index}>{activity?.activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
{/* CREATE AN IF ELSE HERE - IF PRESENT THEN ONLY DISPLAY */}
              {studentProfile?.studentProfileTutoringExperience ? 
              <div className="card mt-4 zoom-card">
              <div className="card-body">
                <h5>Tutoring Experience</h5>
                <ul>
                  {studentProfile?.studentProfileTutoringExperience?.map((experience, index) => (
                    <li key={index}>{experience?.experience}</li>
                  ))}
                </ul>
              </div>
            </div> : <></>
              }
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>External Links</h5>
                  <ul>
                    {studentProfile?.studentProfileExternalLinks?.map((link, index) => (
                      <li key={index}>
                        <a href={link?.linkAddress} target="_blank" rel="noopener noreferrer">{link?.linkName}</a>
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

            {/* <div className="text-center mt-4">
              <h5>Sessions Conducted</h5>
              <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{studentProfile?.studentProfileSessionsConducted}</p>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
