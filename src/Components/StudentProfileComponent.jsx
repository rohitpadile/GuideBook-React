import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const StudentProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};
  const profilePhotoUrl = `/studentProfilePhotos/${student.studentMis}.jpg`;

  const handleBookSessionClick = () => {
    navigate('/bookSession', { state: { student } });
  };

  // Provide default values to avoid undefined errors
  const studentAboutSection = student.studentAboutSection || [];
  const studentOtherExamScoreDetails = student.studentOtherExamScoreDetails || [];
  const studentAcademicActivity = student.studentAcademicActivity || [];
  const studentCoCurricularActivity = student.studentCoCurricularActivity || [];
  const studentExtraCurricularAchievements = student.studentExtraCurricularAchievements || [];
  const studentTutoringExperience = student.studentTutoringExperience || '';

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
              <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '150px' }} />
            </div>
            <div className="col-md-8">
              <h5>Basic</h5>
              <p>Name: {student.studentName}</p>
              <p>Branch: {student.branchName}</p>
              <p>Grade: {student.grade}</p>
              <p>CET Percentile: {student.cetPercentile}</p>
              <p>Class Type: {student.studentClassType}</p>
              <p>Language: {student.languageName}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-4">
            <h5>About</h5>
            <ul>
              {studentAboutSection.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Coaching City */}
          <div className="mt-4">
            <h5>City of Coaching</h5>
            <p>{student.studentCityOfCoaching}</p>
          </div>

          {/* Score Details */}
          <div className="mt-4">
            <h5>Score Details</h5>
            <p>{student.studentScoreDetails}</p>
          </div>

          {/* Other Exam Scores */}
          <div className="mt-4">
            <h5>Other Exam Scores</h5>
            <ul>
              {studentOtherExamScoreDetails.map((exam, index) => (
                <li key={index}>{exam}</li>
              ))}
            </ul>
          </div>

          {/* Academic Activities */}
          <div className="mt-4">
            <h5>Academic Activities</h5>
            <p>{student.studentAcademicActivity}</p>
          </div>

          {/* Co-Curricular Activities */}
          <div className="mt-4">
            <h5>Co-Curricular Activities</h5>
            <p>{student.studentCoCurricularActivity}</p>
          </div>

          {/* Extra-Curricular Achievements */}
          <div className="mt-4">
            <h5>Extra-Curricular Achievements</h5>
            <p>{student.studentExtraCurricularAchievements}</p>
          </div>

          {/* Tutoring Experience */}
          <div className="mt-4">
            <h5>Tutoring Experience</h5>
            <p>{studentTutoringExperience}</p>
          </div>

          {/* Sessions Conducted */}
          <div className="mt-4">
            <h5>Sessions Conducted</h5>
            <p>{student.studentSessionsConducted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
