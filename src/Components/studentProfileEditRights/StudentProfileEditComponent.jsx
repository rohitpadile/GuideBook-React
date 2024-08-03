import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/StudentProfileEditComponentCss.css'; // Import CSS
import { getStudentProfile, getStudentBasicDetails, updateStudentProfile } from '../../Services/apiServiceAdmin'; // Adjust import path as necessary
import { S3_PROFILE_PHOTO_BASE_URL } from '../../constants/s3url'; // Import the constant
import { decrypt } from '../../Services/encryptionForStudentProfileEdit'; // Ensure proper import

const StudentProfileEditComponent = () => {
  const location = useLocation();
  const encryptedEmail = location.pathname.split('/').pop();
  const [studentWorkEmail, setStudentWorkEmail] = useState('');
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentBasicDetails, setStudentBasicDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    about: [''],
    cityOfCoaching: [''],
    scoreDetails: [''],
    otherExamScores: [''],
    activityAndAchievements: [''],
    tutoringExperience: [''],
    externalLinks: [{ linkName: '', linkAddress: '' }],
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const decryptedEmail = decrypt(encryptedEmail);
        setStudentWorkEmail(decryptedEmail);

        const profileData = await getStudentProfile(decryptedEmail);
        setStudentProfile(profileData);
        setFormValues({
          about: profileData.studentProfileAboutSection.map(item => item.about) || [''],
          cityOfCoaching: profileData.studentProfileCityOfCoaching.map(item => item.cityOfCoaching) || [''],
          scoreDetails: profileData.studentProfileExamScoreDetails.map(item => item.scoreDetail) || [''],
          otherExamScores: profileData.studentProfileOtherExamScoreDetails.map(item => item.otherScoreDetail) || [''],
          activityAndAchievements: profileData.studentProfileActivityAndAchievements.map(item => item.activity) || [''],
          tutoringExperience: profileData.studentProfileTutoringExperience.map(item => item.experience) || [''],
          externalLinks: profileData.studentProfileExternalLinks.map(item => ({ linkName: item.linkName, linkAddress: item.linkAddress })) || [{ linkName: '', linkAddress: '' }],
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

  const handleInputChange = (section, index, event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => {
      const updatedSection = [...prevValues[section]];
      if (section === 'externalLinks') {
        updatedSection[index] = { ...updatedSection[index], [name]: value };
      } else {
        updatedSection[index] = value;
      }
      return {
        ...prevValues,
        [section]: updatedSection,
      };
    });
  };

  const handleAddItem = (section) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [section]: section === 'externalLinks'
        ? [...prevValues[section], { linkName: '', linkAddress: '' }]
        : [...prevValues[section], '']
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormValues(prevValues => {
      const updatedSection = prevValues[section].filter((_, i) => i !== index);
      return {
        ...prevValues,
        [section]: updatedSection,
      };
    });
  };

  const handleSave = async () => {
    try {
      const updateRequest = {
        studentProfileAboutSection: formValues.about.map(item => ({ about: item })),
        studentProfileCityOfCoaching: formValues.cityOfCoaching.map(item => ({ cityOfCoaching: item })),
        studentProfileExamScoreDetails: formValues.scoreDetails.map(item => ({ scoreDetail: item })),
        studentProfileOtherExamScoreDetails: formValues.otherExamScores.map(item => ({ otherScoreDetail: item })),
        studentProfileActivityAndAchievements: formValues.activityAndAchievements.map(item => ({ activity: item })),
        studentProfileTutoringExperience: formValues.tutoringExperience.map(item => ({ experience: item })),
        studentProfileExternalLinks: formValues.externalLinks.map(item => ({ linkName: item.linkName, linkAddress: item.linkAddress })),
      };
      await updateStudentProfile(studentWorkEmail, updateRequest);
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
                  <ul>
                    {formValues.about.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleInputChange('about', index, e)}
                        />
                        <button onClick={() => handleRemoveItem('about', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('about')}>Add</button>
                </div>
              </div>

              {/* City of Coaching Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>City of Coaching</h5>
                  <ul>
                    {formValues.cityOfCoaching.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleInputChange('cityOfCoaching', index, e)}
                        />
                        <button onClick={() => handleRemoveItem('cityOfCoaching', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('cityOfCoaching')}>Add</button>
                </div>
              </div>

              {/* Score Details Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Score Details</h5>
                  <ul>
                    {formValues.scoreDetails.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleInputChange('scoreDetails', index, e)}
                        />
                        <button onClick={() => handleRemoveItem('scoreDetails', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('scoreDetails')}>Add</button>
                </div>
              </div>

              {/* Other Exam Scores Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Other Exam Scores</h5>
                  <ul>
                    {formValues.otherExamScores.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleInputChange('otherExamScores', index, e)}
                        />
                        <button onClick={() => handleRemoveItem('otherExamScores', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('otherExamScores')}>Add</button>
                </div>
              </div>

              {/* Activity and Achievements Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Activity and Achievements</h5>
                  <ul>
                    {formValues.activityAndAchievements.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleInputChange('activityAndAchievements', index, e)}
                        />
                        <button onClick={() => handleRemoveItem('activityAndAchievements', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('activityAndAchievements')}>Add</button>
                </div>
              </div>

              {/* Tutoring Experience Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Tutoring Experience</h5>
                  <ul>
                    {formValues.tutoringExperience.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleInputChange('tutoringExperience', index, e)}
                        />
                        <button onClick={() => handleRemoveItem('tutoringExperience', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('tutoringExperience')}>Add</button>
                </div>
              </div>

              {/* External Links Section */}
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>External Links</h5>
                  <ul>
                    {formValues.externalLinks.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          name="linkName"
                          value={item.linkName}
                          onChange={(e) => handleInputChange('externalLinks', index, e)}
                          placeholder="Link Name"
                        />
                        <input
                          type="text"
                          name="linkAddress"
                          value={item.linkAddress}
                          onChange={(e) => handleInputChange('externalLinks', index, e)}
                          placeholder="Link Address"
                        />
                        <button onClick={() => handleRemoveItem('externalLinks', index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddItem('externalLinks')}>Add</button>
                </div>
              </div>

              <button className="btn btn-primary mt-4" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileEditComponent;
