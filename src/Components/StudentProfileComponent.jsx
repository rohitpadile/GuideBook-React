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
  const experience = student.experience || [];
  const projects = student.projects || [];
  const skills = student.skills || [];

  return (
    <div className="container mt-5">
      <div className="card student-profile-card">
        <div className="card-header student-profile-header">
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
              <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid rounded-circle" />
            </div>
            <div className="col-md-8">
              <h5>{student.studentName}</h5>
              <p>Branch: {student.branchName}</p>
              <p>Grade: {student.grade}</p>
              <p>CET Percentile: {student.cetPercentile}</p>
              <p>Class Type: {student.studentClassType}</p>
              <p>Language: {student.languageName}</p>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-4">
            <h5>Education</h5>
            <div className="card mt-2">
              <div className="card-body">
                <h6 className="card-title">{student.collegeName}</h6>
                <p className="card-text">Branch: {student.branchName}</p>
                <p className="card-text">Year of Study: {student.yearOfStudy}</p>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-4">
            <h5>Experience</h5>
            {experience.length > 0 ? (
              experience.map((exp, index) => (
                <div className="card mt-2" key={index}>
                  <div className="card-body">
                    <h6 className="card-title">{exp.position}</h6>
                    <p className="card-text">{exp.companyName}</p>
                    <p className="card-text">{exp.duration}</p>
                    <p className="card-text">{exp.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No experience listed.</p>
            )}
          </div>

          {/* Projects Section */}
          <div className="mt-4">
            <h5>Projects</h5>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div className="card mt-2" key={index}>
                  <div className="card-body">
                    <h6 className="card-title">{project.projectTitle}</h6>
                    <p className="card-text">{project.description}</p>
                    <p className="card-text">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Project Link
                      </a>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects listed.</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="mt-4">
            <h5>Skills</h5>
            {skills.length > 0 ? (
              <div className="card mt-2">
                <div className="card-body">
                  {skills.map((skill, index) => (
                    <span key={index} className="badge badge-primary mr-2">{skill}</span>
                  ))}
                </div>
              </div>
            ) : (
              <p>No skills listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
