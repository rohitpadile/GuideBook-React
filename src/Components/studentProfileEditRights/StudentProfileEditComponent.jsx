import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/StudentProfileComponentCss.css'; // Import CSS
import { getStudentProfile, getStudentBasicDetails, updateStudentProfile } from '../../Services/apiServiceAdmin'; // Adjust import path as necessary
import { S3_PROFILE_PHOTO_BASE_URL } from '../../constants/s3url'; // Import the constant
import { decrypt } from '../../Services/encryptionForStudentProfileEdit'; // Ensure proper import

const StudentProfileEditComponent = () => {
  const location = useLocation();
  const encryptedEmail = location.pathname.split('/').pop();
  const [studentWorkEmail, setStudentWorkEmail] = useState('');
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentBasicDetails, setStudentBasicDetails] = useState(null);
  const [editMode, setEditMode] = useState({
    about: false,
    cityOfCoaching: false,
    scoreDetails: false,
    otherExamScores: false,
    activityAndAchievements: false,
    tutoringExperience: false,
    externalLinks: false,
  });

  const [formValues, setFormValues] = useState({
    about: [],
    cityOfCoaching: [],
    scoreDetails: [],
    otherExamScores: [],
    activityAndAchievements: [],
    tutoringExperience: [],
    externalLinks: [],
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Decrypt the email
        const decryptedEmail = decrypt(encryptedEmail);
        setStudentWorkEmail(decryptedEmail);

        // Fetch student profile and basic details
        const profileData = await getStudentProfile(decryptedEmail);
        setStudentProfile(profileData);
        setFormValues({
          about: profileData.studentProfileAboutSection || [],
          cityOfCoaching: profileData.studentProfileCityOfCoaching || [],
          scoreDetails: profileData.studentProfileExamScoreDetails || [],
          otherExamScores: profileData.studentProfileOtherExamScoreDetails || [],
          activityAndAchievements: profileData.studentProfileActivityAndAchievements || [],
          tutoringExperience: profileData.studentProfileTutoringExperience || [],
          externalLinks: profileData.studentProfileExternalLinks || [],
        });

        const basicDetails = await getStudentBasicDetails(decryptedEmail);
        setStudentBasicDetails(basicDetails);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    if (encryptedEmail) {
      fetchStudentData();
    }
  }, [encryptedEmail]);

  const handleEditToggle = (section) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      [section]: !prevMode[section],
    }));
  };

  const handleInputChange = (section, index, event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => {
      const updatedSection = [...prevValues[section]];
      if (typeof index === 'number') {
        updatedSection[index] = value;
      } else {
        updatedSection[name] = value;
      }
      return {
        ...prevValues,
        [section]: updatedSection,
      };
    });
  };

  const handleSave = async (section) => {
    try {
      const updateRequest = {
        studentProfileAboutSection: formValues.about,
        studentProfileCityOfCoaching: formValues.cityOfCoaching,
        studentProfileExamScoreDetails: formValues.scoreDetails,
        studentProfileOtherExamScoreDetails: formValues.otherExamScores,
        studentProfileActivityAndAchievements: formValues.activityAndAchievements,
        studentProfileTutoringExperience: formValues.tutoringExperience,
        studentProfileExternalLinks: formValues.externalLinks,
      };
      await updateStudentProfile(studentWorkEmail, updateRequest);
      setEditMode((prevMode) => ({
        ...prevMode,
        [section]: false,
      }));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (!studentProfile || !studentBasicDetails) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  const profilePhotoUrl = `${S3_PROFILE_PHOTO_BASE_URL}${studentWorkEmail}.jpg`;

  return (
    <div className="container mt-5">
      <div className="card student-profile-card mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-header student-profile-header d-flex justify-content-between align-items-center">
          <h4>Student Profile</h4>
        </div>
        <div className="card-body student-profile-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="student-info-card">
                <div className="profile-info-card">
                  <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid rounded-circle profile-photo" />
                  <h5 className="student-name mt-3 student-name-unique">{studentBasicDetails?.studentName}</h5>
                  <p className="student-branch">{studentBasicDetails?.branch}</p>
                </div>
                <div className="sessions-conducted mt-4">
                  <h5>Sessions Conducted</h5>
                  <p className="big-number">{studentProfile?.studentProfileSessionsConducted}</p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {/* Basic Information Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Basic Information</h5>
                  <ul>
                    <li>Grade: {studentBasicDetails?.grade}</li>
                    <li>Exam Score: {studentBasicDetails?.cetPercentile}</li>
                    <li>Class Type: {studentBasicDetails?.classType}</li>
                    <li>Language: {studentBasicDetails?.languagesSpoken?.join(', ')}</li>
                    <li>Category: {studentBasicDetails?.category}</li>
                    <li>College: {studentBasicDetails?.college}</li>
                  </ul>
                </div>
              </div>

              {/* About Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>About</h5>
                  {editMode.about ? (
                    <div>
                      <ul>
                        {formValues.about.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('about', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('about')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.about.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('about')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* City of Coaching Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>City of Coaching</h5>
                  {editMode.cityOfCoaching ? (
                    <div>
                      <ul>
                        {formValues.cityOfCoaching.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('cityOfCoaching', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('cityOfCoaching')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.cityOfCoaching.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('cityOfCoaching')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Score Details Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Score Details</h5>
                  {editMode.scoreDetails ? (
                    <div>
                      <ul>
                        {formValues.scoreDetails.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('scoreDetails', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('scoreDetails')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.scoreDetails.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('scoreDetails')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Other Exam Scores Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Other Exam Scores</h5>
                  {editMode.otherExamScores ? (
                    <div>
                      <ul>
                        {formValues.otherExamScores.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('otherExamScores', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('otherExamScores')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.otherExamScores.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('otherExamScores')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity and Achievements Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Activity and Achievements</h5>
                  {editMode.activityAndAchievements ? (
                    <div>
                      <ul>
                        {formValues.activityAndAchievements.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('activityAndAchievements', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('activityAndAchievements')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.activityAndAchievements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('activityAndAchievements')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tutoring Experience Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Tutoring Experience</h5>
                  {editMode.tutoringExperience ? (
                    <div>
                      <ul>
                        {formValues.tutoringExperience.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('tutoringExperience', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('tutoringExperience')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.tutoringExperience.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('tutoringExperience')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              {/* External Links Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>External Links</h5>
                  {editMode.externalLinks ? (
                    <div>
                      <ul>
                        {formValues.externalLinks.map((item, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleInputChange('externalLinks', index, e)}
                            />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('externalLinks')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {formValues.externalLinks.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('externalLinks')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileEditComponent;
