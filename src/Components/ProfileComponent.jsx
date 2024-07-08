import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
// import { fetchCurrentProfile } from '../Services/apiServiceAdmin';

const ProfileComponent = () => {
  const [profileData, setProfileData] = useState({});
  const [isStudent, setIsStudent] = useState(true);//TEMPORARILY SET THE IsStudent to true

//   useEffect(() => {
//     const getProfileData = async () => {
//       try {
//         const data = await fetchCurrentProfile();
//         setProfileData(data);
//         setIsStudent(data.studentMis !== undefined);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     getProfileData();
//   }, []);


 

  return (
    <div className="container mt-5">
      <div className="card profile-card mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
        <div className="card-header bg-primary text-white text-center">
          <h4>Profile</h4>
        </div>
        <div className="card-body">
          {isStudent ? (
            <>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Student Work Email</label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.studentWorkEmail}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Student Public Email</label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.studentPublicEmail}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">MIS</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentMis}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">CET Percentile</label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    value={profileData.cetPercentile}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Grade</label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    value={profileData.grade}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Category</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentCategory?.categoryName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">College</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentCollege?.collegeName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Branch</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentBranch?.branchName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Class Type</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentClassType?.classTypeName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Languages</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.studentLanguageList?.map(lang => lang.languageName).join(', ')}
                    readOnly
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">First Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.clientFirstName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Middle Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.clientMiddleName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Last Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.clientLastName}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.clientEmail}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Phone Number</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.clientPhoneNumber}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Age</label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    value={profileData.clientAge}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">College</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.clientCollege}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Proof Document</label>
                <div className="col-sm-8">
                  <a href={`/${profileData.clientProofDocPath}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
