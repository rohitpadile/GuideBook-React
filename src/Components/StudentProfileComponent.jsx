import React from 'react';
import { useLocation } from 'react-router-dom';

const StudentProfileComponent = () => {
  const location = useLocation();
  const { student } = location.state;
  const profilePhotoUrl = `/studentProfilePhotos/${student.studentMis}.jpg`;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h4>Student Profile</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid" />
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
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
