import React, { useEffect, useState } from 'react';
import axios from 'axios';
import auth from '../../auth'; // Assuming auth.js is in the parent directory
import '../../css/profileAccount/ProfileAccountCss.css'; // Importing the CSS file

const ProfileAccount = () => {
  const [accountType, setAccountType] = useState(null); // 'student', 'client', or 'none'
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchAccountTypeAndProfileData = async () => {
      try {
        const token = auth.getToken();

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const accountTypeResponse = await axios.post(
          'http://localhost:8080/api/v1/user/checkUserEmailAccountType',
          {},
          config
        );

        const { accountType } = accountTypeResponse.data;

        if (accountType === 1) {
          setAccountType('student');
          const studentResponse = await axios.post(
            'http://localhost:8080/api/v1/user/getStudentMentorProfileAccountDetails',
            {},
            config
          );
          setProfileData(studentResponse.data);
        } else if (accountType === 2) {
          setAccountType('client');
          const clientResponse = await axios.post(
            'http://localhost:8080/api/v1/user/getClientProfileAccountDetails',
            {},
            config
          );
          setProfileData(clientResponse.data);
        } else {
          setAccountType('none');
        }
      } catch (error) {
        console.error('There was an error fetching the profile data!', error);
      }
    };

    fetchAccountTypeAndProfileData();
  }, []);

  if (accountType === null) {
    return <div className="profile-account-loading">Loading...</div>;
  }

  if (accountType === 'none') {
    return <div className="profile-account-no-data">No profile data available for this account.</div>;
  }

  if (!profileData) {
    return <div className="profile-account-loading">Loading profile data...</div>;
  }

  return (
    <div className="profile-account">
      {accountType === 'student' ? (
        <div className="profile-account-student">
          <h2 className="profile-account-title">Student Mentor Profile</h2>
          <p className="profile-account-info"><strong>Email:</strong> {profileData.studentMentorAccountWorkEmail}</p>
          <p className="profile-account-info">
            <strong>Monthly Subscription:</strong>{' '}
            {profileData.studentMentorAccountSubscription_Monthly === 1 ? 'Active' : 'Inactive'}
          </p>
          <p className="profile-account-info"><strong>Branch:</strong> {profileData.branch}</p>
          <p className="profile-account-info"><strong>Exam Score:</strong> {profileData.examScore}</p>
          <p className="profile-account-info"><strong>Grade:</strong> {profileData.grade}</p>
          <p className="profile-account-info"><strong>Year of Study:</strong> {profileData.yearOfStudy}</p>
          <p className="profile-account-info"><strong>Languages Spoken:</strong> {profileData.languagesSpoken.join(', ')}</p>
          <p className="profile-account-info"><strong>Public Email:</strong> {profileData.publicEmail}</p>
          <p className="profile-account-info"><strong>College:</strong> {profileData.college}</p>
          <p className="profile-account-info"><strong>Student Name:</strong> {profileData.studentName}</p>
          <a className="profile-account-edit-link" href={profileData.editStudentProfileLink}>Edit Profile</a>
        </div>
      ) : (
        <div className="profile-account-client">
          <h2 className="profile-account-title">Client Profile</h2>
          <p className="profile-account-info"><strong>Email:</strong> {profileData.clientAccountEmail}</p>
          <p className="profile-account-info"><strong>Zoom Sessions:</strong> {profileData.clientAccountZoomSessionCount}</p>
          <p className="profile-account-info"><strong>Offline Sessions:</strong> {profileData.clientAccountOfflineSessionCount}</p>
          <p className="profile-account-info">
            <strong>Monthly Subscription:</strong>{' '}
            {profileData.clientAccountSubscription_Monthly === 1 ? 'Active' : 'Inactive'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileAccount;
