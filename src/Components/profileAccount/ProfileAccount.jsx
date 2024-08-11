import React, { useEffect, useState } from 'react';
import axios from 'axios';
import auth from '../../auth'; // Assuming auth.js is in the parent directory

const ProfileAccount = () => {
  const [accountType, setAccountType] = useState(null); // 'student', 'client', or 'none'
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchAccountTypeAndProfileData = async () => {
      try {
        // Set the auth token in the headers
        const token = auth.getToken(); // Assuming this method retrieves the stored token

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Send request to check the account type
        const accountTypeResponse = await axios.post(
          'http://localhost:8080/api/v1/user/checkUserEmailAccountType',
          {},
          config
        );

        const { accountType } = accountTypeResponse.data;

        if (accountType === 1) {
          // Student Mentor account
          setAccountType('student');
          const studentResponse = await axios.post(
            'http://localhost:8080/api/v1/user/getStudentMentorProfileAccountDetails',
            {},
            config
          );
          setProfileData(studentResponse.data);
        } else if (accountType === 2) {
          // Client account
          setAccountType('client');
          const clientResponse = await axios.post(
            'http://localhost:8080/api/v1/user/getClientProfileAccountDetails',
            {},
            config
          );
          setProfileData(clientResponse.data);
        } else {
          // No account found
          setAccountType('none');
        }
      } catch (error) {
        console.error('There was an error fetching the profile data!', error);
      }
    };

    fetchAccountTypeAndProfileData();
  }, []);

  if (accountType === null) {
    return <div>Loading...</div>;
  }

  if (accountType === 'none') {
    return <div>No profile data available for this account.</div>;
  }

  if (!profileData) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div className="profile-account">
      {accountType === 'student' ? (
        <div>
          <h2>Student Mentor Profile</h2>
          <p>Email: {profileData.studentMentorAccountWorkEmail}</p>
          <p>
            Monthly Subscription:{' '}
            {profileData.studentMentorAccountSubscription_Monthly === 1
              ? 'Active'
              : 'Inactive'}
          </p>
          <p>Branch: {profileData.branch}</p>
          <p>Exam Score: {profileData.examScore}</p>
          <p>Grade: {profileData.grade}</p>
          <p>Year of Study: {profileData.yearOfStudy}</p>
          <p>Languages Spoken: {profileData.languagesSpoken.join(', ')}</p>
          <p>Public Email: {profileData.publicEmail}</p>
          <p>College: {profileData.college}</p>
          <p>Student Name: {profileData.studentName}</p>
          <a href={profileData.editStudentProfileLink}>Edit Profile</a>
          {/* Add more student-specific details here */}
        </div>
      ) : (
        <div>
          <h2>Client Profile</h2>
          <p>Email: {profileData.clientAccountEmail}</p>
          <p>Zoom Sessions: {profileData.clientAccountZoomSessionCount}</p>
          <p>Offline Sessions: {profileData.clientAccountOfflineSessionCount}</p>
          <p>
            Monthly Subscription:{' '}
            {profileData.clientAccountSubscription_Monthly === 1
              ? 'Active'
              : 'Inactive'}
          </p>
          {/* Add more client-specific details here */}
        </div>
      )}
    </div>
  );
};

export default ProfileAccount;
