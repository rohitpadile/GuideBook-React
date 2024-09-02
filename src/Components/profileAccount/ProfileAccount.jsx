import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAccountTypeAndProfileData, editProfileData, checkDummyAccount } from '../../Services/userAccountApiService';
import auth from '../../auth'; // Assuming auth.js is in the parent directory
import '../../css/profileAccount/ProfileAccountCss.css'; // Importing the CSS file
import { getUserBookedTickets } from '../../Services/meetHostApiService';
import { useNavigate } from 'react-router-dom';
const ProfileAccount = () => {
  const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
  const [accountType, setAccountType] = useState(null); // 'student', 'client', or 'none'
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false); // For toggling edit mode
  const [editData, setEditData] = useState({}); // For holding the edited data
  const [dummyAcc, setDummyAcc] = useState(null);
  const [bookedTickets, setBookedTickets] = useState([]); // State to store open tickets
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = auth.getToken();
        const { accountType, profileData } = await getAccountTypeAndProfileData(token);
        
        if (accountType === 'none') {
          setAccountType('none');
        } else {
          setAccountType(accountType);
          setProfileData(profileData);
          setEditData(profileData); // Initialize editData with the fetched profile data
        }
      } catch (error) {
        console.error('There was an error fetching the profile data!', error);
      }
    };
    // Method to check if the account is dummy or not
    const checkDummyAccountStatus = async () => {
      try {
        const token = auth.getToken();
        const response = await checkDummyAccount(token);
        // console.log('Check Dummy Account Response:', response); // Add this to see the API response
        if (response === true || response === 'true') {
          setDummyAcc(1);
        } else {
          setDummyAcc(0);
        }
        
      } catch (error) {
        setDummyAcc(0);
        // console.error('Account not a dummy account!', error);
      }
    };
    
    const fetchTickets = async () => {
      const tickets = await getUserBookedTickets();
      console.log(tickets);
      setBookedTickets(tickets);
    };

    fetchAccountData();
    checkDummyAccountStatus();
    fetchTickets();
  }, []);

  

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleAddSubscription = () => {
    navigate("/subscription");
  };
  const handleSave = async () => {
    try {
      const token = auth.getToken();
      const isSaved = await editProfileData(token, accountType, editData);

      if (isSaved) {
        setProfileData(editData); // Update the displayed profile data with the edited data
        setEditMode(false); // Exit edit mode
      }
    } catch (error) {
      console.error('There was an error saving the profile data!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (accountType === null) {
    // return <div className="profile-account-loading">Loading...</div>;
    return <img src={`${BASE_URL}logoblack.jpg`} alt="GuidebookX" className="loading-logo" />
  }

  if (accountType === 'none') {
    return <div className="profile-account-no-data">No profile data available for this account.</div>;
  }

  if (!profileData) {
    // return <div className="profile-account-loading">Loading profile data...</div>;
    return <img src={`${BASE_URL}logoblack.jpg`} alt="GuidebookX" className="loading-logo" />
  }

  return (
    <div className='profile-account-container'>
        <div className="profile-account">
      {accountType === 'student' ? (
        <div className="profile-account-student">
          <h2 className="profile-account-title">Student Mentor Profile</h2>
          <p className="profile-account-info"><strong>Student Name:</strong> {profileData.studentName}</p>
          <p className="profile-account-info"><strong>Email:</strong> {profileData.studentMentorAccountWorkEmail}</p>
          <p className="profile-account-info"><strong>College:</strong> {profileData.college}</p>
          <p className="profile-account-info"><strong>Branch:</strong> {profileData.branch}</p>
          <p className="profile-account-info"><strong>Exam Score:</strong> {profileData.examScore}</p>
          <p className="profile-account-info"><strong>Grade:</strong> {profileData.grade}</p>
          <p className="profile-account-info"><strong>Year of Study:</strong> {profileData.yearOfStudy}</p>
          <p className="profile-account-info"><strong>Languages Spoken:</strong> {profileData.languagesSpoken.join(', ')}</p>
          <p className="profile-account-info"><strong>Public Email:</strong> {profileData.publicEmail}</p>
          <p className="profile-account-info"><strong>Sessions Conducted:</strong> {profileData.studentProfileSessionsConducted}</p>
          {/*  */}
          {/* {editMode ? (
            <>
              Editable Sessions Per Week
              <input
                className="profile-account-edit-input"
                type="number"
                name="zoomSessionsPerWeek"
                value={editData.zoomSessionsPerWeek}
                onChange={handleChange}
                placeholder="Sessions per week (Effective from next week)"
              />

              Editable Sessions Remaining Per Week
              <input
                className="profile-account-edit-input"
                type="number"
                name="zoomSessionsRemainingPerWeek"
                value={editData.zoomSessionsRemainingPerWeek}
                onChange={handleChange}
                placeholder="Sessions remaining this week (adjust for current week)"
              />
              <p>Keep sessions per week one more than what you prefer because we assume that the last session will be payed and booked to handle unnecessary booking of many sessions in the last count.</p>
              <button className="profile-account-edit-link" onClick={handleSave}>Save</button>
            </>
            
          ) : (
            <>
              Display when not in edit mode
              <p className="profile-account-info">
                <strong>Sessions per week:</strong> {profileData.zoomSessionsPerWeek}
              </p>
              <p className="profile-account-info">
                <strong>Sessions remaining this week(adjust):</strong> {profileData.zoomSessionsRemainingPerWeek}
              </p>
              <button className="profile-account-edit-link" onClick={handleEdit}>Edit sessions limit</button>
            </>
          )} 

          
          {/*  */}
          <h2 className="profile-account-title">Subscription Plans</h2>
          <p className="profile-account-info">
            <strong>Monthly Subscription:</strong>{' '}
            {profileData.studentMentorAccountSubscription_Monthly === 1 ? 'Active' : 'Inactive'}
          </p>
          <div>
            {/* SUBSCRIPTION BUTTON*/}
            {dummyAcc === 1 ? (
              <button className="profile-account-subscription-link" onClick={handleAddSubscription}>Add Subscription</button>
            ) : <></>}
            
          </div>
          
          <h2 className="profile-account-title">Client Profile</h2>
          {editMode ? (
            <>
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientFirstName"
                value={editData.clientFirstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientMiddleName"
                value={editData.clientMiddleName}
                onChange={handleChange}
                placeholder="Middle Name"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientLastName"
                value={editData.clientLastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientPhoneNumber"
                value={editData.clientPhoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <input
                className="profile-account-edit-input"
                type="number"
                name="clientAge"
                value={editData.clientAge}
                onChange={handleChange}
                placeholder="Age"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientCollege"
                value={editData.clientCollege}
                onChange={handleChange}
                placeholder="College"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientValidProof"
                value={editData.clientValidProof}
                onChange={handleChange}
                placeholder="Valid Proof"
              />
              <input
                className="profile-account-edit-input"
                type="email"
                name="clientZoomEmail"
                value={editData.clientZoomEmail}
                onChange={handleChange}
                placeholder="Zoom Email"
              />
              <button className="profile-account-edit-link" onClick={handleSave}>Save Profile</button>
            </>
          ) : (
            <>
              <p className="profile-account-info"><strong>First Name:</strong> {profileData.clientFirstName}</p>
              <p className="profile-account-info"><strong>Middle Name:</strong> {profileData.clientMiddleName}</p>
              <p className="profile-account-info"><strong>Last Name:</strong> {profileData.clientLastName}</p>
              <p className="profile-account-info"><strong>Phone Number:</strong> {profileData.clientPhoneNumber}</p>
              <p className="profile-account-info"><strong>Age:</strong> {profileData.clientAge}</p>
              <p className="profile-account-info"><strong>College:</strong> {profileData.college}</p>
              <p className="profile-account-info"><strong>Valid Proof:</strong> {profileData.clientValidProof}</p>
              <p>For mentors, we will soon provide a verified mark and a valid proof link from the company.</p>
              <p className="profile-account-info"><strong>Zoom Email:</strong> {profileData.clientZoomEmail}</p>
              <button className="profile-account-edit-link" onClick={handleEdit}>Edit Profile</button>

              
            </>
          )}
          <h2 className="profile-account-title">Session Count</h2>
          <p className="profile-account-info"><strong>Zoom Sessions Attended:</strong> {profileData.studentMentorAccountZoomSessionCount}</p>
          <p className="profile-account-info"><strong>Offline Sessions Attended:</strong> {profileData.studentMentorAccountOfflineSessionCount}</p>
          <p>You can edit your public profile now</p>
          <Link className="profile-account-edit-link" to="/StudentProfileEdit">
            Edit Public Profile
          </Link>
          
        </div>
      ) : (
        <div className="profile-account-client">
          <h2 className="profile-account-title">Client Profile</h2>
          {editMode ? (
            <>
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientFirstName"
                value={editData.clientFirstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientMiddleName"
                value={editData.clientMiddleName}
                onChange={handleChange}
                placeholder="Middle Name"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientLastName"
                value={editData.clientLastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientPhoneNumber"
                value={editData.clientPhoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <input
                className="profile-account-edit-input"
                type="number"
                name="clientAge"
                value={editData.clientAge}
                onChange={handleChange}
                placeholder="Age"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientCollege"
                value={editData.clientCollege}
                onChange={handleChange}
                placeholder="College"
              />
              <input
                className="profile-account-edit-input"
                type="text"
                name="clientValidProof"
                value={editData.clientValidProof}
                onChange={handleChange}
                placeholder="Valid Proof"
              />
              <input
                className="profile-account-edit-input"
                type="email"
                name="clientZoomEmail"
                value={editData.clientZoomEmail}
                onChange={handleChange}
                placeholder="Zoom Email"
              />
              <button className="profile-account-edit-link" onClick={handleSave}>Save Profile</button>
            </>
          ) : (
            <>
              <p className="profile-account-info"><strong>First Name:</strong> {profileData.clientFirstName}</p>
              <p className="profile-account-info"><strong>Middle Name:</strong> {profileData.clientMiddleName}</p>
              <p className="profile-account-info"><strong>Last Name:</strong> {profileData.clientLastName}</p>
              <p className="profile-account-info"><strong>Phone Number:</strong> {profileData.clientPhoneNumber}</p>
              <p className="profile-account-info"><strong>Age:</strong> {profileData.clientAge}</p>
              <p className="profile-account-info"><strong>College:</strong> {profileData.clientCollege}</p>
              <p className="profile-account-info"><strong>Valid Proof:</strong> {profileData.clientValidProof}</p>
              <p className="profile-account-info"><strong>Zoom Email:</strong> {profileData.clientZoomEmail}</p>
              <button className="profile-account-edit-link" onClick={handleEdit}>Edit Profile</button>
              <h2 className="profile-account-title">Subscription Plans</h2>
              <p className="profile-account-info">
              <strong>Monthly Subscription:</strong>{' '}
              {profileData.clientAccountSubscription_Monthly === 1 ? 'Active' : 'Inactive'}
              </p>
              <div>
                {/* SUBSCRIPTION BUTTON*/}
                {/* SUBSCRIPTION BUTTON*/}
                {dummyAcc === 1 && (
                  <button className="profile-account-subscription-link" onClick={handleAddSubscription}>Add Subscription</button>
                )}

                
              </div>
            </>
          )}
          <h2 className="profile-account-title">Session Count</h2>
          <p className="profile-account-info"><strong>Zoom Sessions Attended:</strong> {profileData.clientAccountZoomSessionCount}</p>
          <p className="profile-account-info"><strong>Offline Sessions Attended:</strong> {profileData.clientAccountOfflineSessionCount}</p>
        </div>
      )}
    </div>
    <div className="profile-account">
      <h2 className="profile-account-title">Booked Tickets</h2>
      {bookedTickets.length > 0 ? (
        <ul className="ticket-list">
          {bookedTickets.map((ticket, index) => (
            <li key={index} className="ticket-card">
              <p><strong>Event:</strong> {ticket.title}</p>
              <p><strong>Time:</strong> {ticket.dateAndTime}</p>
              <p><strong>Location:</strong> {ticket.eventLocation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active booked tickets found.</p>
      )}
    </div>


    </div>
  
  );
};

export default ProfileAccount;
