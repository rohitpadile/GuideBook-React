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
    basicInfo: false,
    about: false,
    cityOfCoaching: false,
    scoreDetails: false,
    otherExamScores: false,
    activityAndAchievements: false,
    tutoringExperience: false,
    externalLinks: false,
  });

  const [formValues, setFormValues] = useState({
    basicInfo: {},
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
          basicInfo: profileData.basicInfo || {},
          about: profileData.aboutSection || [],
          cityOfCoaching: profileData.cityOfCoaching || [],
          scoreDetails: profileData.examScoreDetails || [],
          otherExamScores: profileData.otherExamScoreDetails || [],
          activityAndAchievements: profileData.activityAndAchievements || [],
          tutoringExperience: profileData.tutoringExperience || [],
          externalLinks: profileData.externalLinks || [],
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
        updatedSection[index][name] = value;
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
        studentPublicEmail: formValues.basicInfo.studentPublicEmail,
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
                {editMode.basicInfo ? (
                  <div>
                    <ul>
                      <li>
                        Grade: <input type="text" name="grade" value={formValues.basicInfo.grade || ''} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                      </li>
                      <li>
                        Exam Score: <input type="text" name="cetPercentile" value={formValues.basicInfo.cetPercentile || ''} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                      </li>
                      <li>
                        Class Type: <input type="text" name="classType" value={formValues.basicInfo.classType || ''} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                      </li>
                      <li>
                        Language: <input type="text" name="languagesSpoken" value={formValues.basicInfo.languagesSpoken?.join(', ') || ''} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                      </li>
                      <li>
                        Category: <input type="text" name="category" value={formValues.basicInfo.category || ''} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                      </li>
                      <li>
                        College: <input type="text" name="college" value={formValues.basicInfo.college || ''} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                      </li>
                    </ul>
                    <button onClick={() => handleSave('basicInfo')}>Save</button>
                  </div>
                ) : (
                  <div>
                    <ul>
                      <li>Grade: {formValues.basicInfo.grade || studentBasicDetails?.grade}</li>
                      <li>Exam Score: {formValues.basicInfo.cetPercentile || studentBasicDetails?.cetPercentile}</li>
                      <li>Class Type: {formValues.basicInfo.classType || studentBasicDetails?.classType}</li>
                      <li>Language: {formValues.basicInfo.languagesSpoken?.join(', ') || studentBasicDetails?.languagesSpoken?.join(', ')}</li>
                      <li>Category: {formValues.basicInfo.category || studentBasicDetails?.category}</li>
                      <li>College: {formValues.basicInfo.college || studentBasicDetails?.college}</li>
                    </ul>
                    <button onClick={() => handleEditToggle('basicInfo')}>Edit</button>
                  </div>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="card mt-4 zoom-card">
              <div className="card-body">
                <h5>About Section</h5>
                {editMode.about ? (
                  <div>
                    <textarea
                      name="about"
                      value={formValues.about.join('\n') || ''}
                      onChange={(e) => handleInputChange('about', null, e)}
                      rows={5}
                    />
                    <button onClick={() => handleSave('about')}>Save</button>
                  </div>
                ) : (
                  <div>
                    <p>{formValues.about.join('\n') || studentProfile?.studentProfileAboutSection.join('\n')}</p>
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
                    <input
                      type="text"
                      name="cityOfCoaching"
                      value={formValues.cityOfCoaching.join(', ') || ''}
                      onChange={(e) => handleInputChange('cityOfCoaching', null, e)}
                    />
                    <button onClick={() => handleSave('cityOfCoaching')}>Save</button>
                  </div>
                ) : (
                  <div>
                    <p>{formValues.cityOfCoaching.join(', ') || studentProfile?.studentProfileCityOfCoaching.join(', ')}</p>
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
                    {formValues.scoreDetails.map((detail, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          name="score"
                          value={detail.score || ''}
                          onChange={(e) => handleInputChange('scoreDetails', index, e)}
                        />
                        <input
                          type="text"
                          name="examName"
                          value={detail.examName || ''}
                          onChange={(e) => handleInputChange('scoreDetails', index, e)}
                        />
                        <button onClick={() => handleSave('scoreDetails')}>Save</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {formValues.scoreDetails.map((detail, index) => (
                      <div key={index}>
                        <p>Score: {detail.score}</p>
                        <p>Exam Name: {detail.examName}</p>
                      </div>
                    ))}
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
                    {formValues.otherExamScores.map((score, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          name="score"
                          value={score.score || ''}
                          onChange={(e) => handleInputChange('otherExamScores', index, e)}
                        />
                        <input
                          type="text"
                          name="examName"
                          value={score.examName || ''}
                          onChange={(e) => handleInputChange('otherExamScores', index, e)}
                        />
                        <button onClick={() => handleSave('otherExamScores')}>Save</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {formValues.otherExamScores.map((score, index) => (
                      <div key={index}>
                        <p>Score: {score.score}</p>
                        <p>Exam Name: {score.examName}</p>
                      </div>
                    ))}
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
                    {formValues.activityAndAchievements.map((activity, index) => (
                      <div key={index}>
                        <textarea
                          name="activity"
                          value={activity || ''}
                          onChange={(e) => handleInputChange('activityAndAchievements', index, e)}
                          rows={3}
                        />
                        <button onClick={() => handleSave('activityAndAchievements')}>Save</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {formValues.activityAndAchievements.map((activity, index) => (
                      <div key={index}>
                        <p>{activity}</p>
                      </div>
                    ))}
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
                    {formValues.tutoringExperience.map((experience, index) => (
                      <div key={index}>
                        <textarea
                          name="experience"
                          value={experience || ''}
                          onChange={(e) => handleInputChange('tutoringExperience', index, e)}
                          rows={3}
                        />
                        <button onClick={() => handleSave('tutoringExperience')}>Save</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {formValues.tutoringExperience.map((experience, index) => (
                      <div key={index}>
                        <p>{experience}</p>
                      </div>
                    ))}
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
                    {formValues.externalLinks.map((link, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          name="link"
                          value={link || ''}
                          onChange={(e) => handleInputChange('externalLinks', index, e)}
                        />
                        <button onClick={() => handleSave('externalLinks')}>Save</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {formValues.externalLinks.map((link, index) => (
                      <div key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                      </div>
                    ))}
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
