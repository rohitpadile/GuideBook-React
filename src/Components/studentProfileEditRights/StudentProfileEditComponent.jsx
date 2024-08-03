import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/StudentProfileComponentCss.css'; // Import CSS
import { getStudentProfile, getStudentBasicDetails, updateStudentProfile } from '../../Services/apiServiceAdmin'; // Adjust the import path as per your file structure
import { S3_PROFILE_PHOTO_BASE_URL } from '../../constants/s3url'; // Import the constant

const StudentProfileEditComponent = () => {
  const location = useLocation();
  const { student } = location.state || {};
  const profilePhotoUrl = `${S3_PROFILE_PHOTO_BASE_URL}${student?.studentWorkEmail}.jpg`;

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
    const fetchStudentProfile = async () => {
      try {
        const profileData = await getStudentProfile(student.studentWorkEmail);
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
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    const fetchStudentBasicDetails = async () => {
      try {
        const basicDetails = await getStudentBasicDetails(student.studentWorkEmail);
        setStudentBasicDetails(basicDetails);
      } catch (error) {
        console.error('Error fetching student basic details:', error);
      }
    };

    if (student?.studentWorkEmail) {
      fetchStudentProfile();
      fetchStudentBasicDetails();
    }
  }, [student?.studentWorkEmail]);

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
      await updateStudentProfile(student.studentWorkEmail, {
        ...studentProfile,
        [section]: formValues[section],
      });
      setEditMode((prevMode) => ({
        ...prevMode,
        [section]: false,
      }));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

//   if (!studentProfile || !studentBasicDetails) {
//     return <div>Loading...</div>; // Display a loading message while fetching data OR CUSTOM COMPANY GIF LIKE LINKEDIN FOES
//   }

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
                {/* Single card for profile photo, name, and branch */}
                <div className="profile-info-card">
                  <img src={profilePhotoUrl} alt="Student Profile" className="img-fluid rounded-circle profile-photo" />
                  <h5 className="student-name mt-3 student-name-unique">{student?.studentName}</h5>
                  <p className="student-branch">{studentBasicDetails?.branch}</p>
                </div>
                {/* Sessions conducted number below the small card */}
                <div className="sessions-conducted mt-4">
                  <h5>Sessions Conducted</h5>
                  <p className="big-number">{studentProfile?.studentProfileSessionsConducted}</p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Basic Information</h5>
                  {editMode.basicInfo ? (
                    <div>
                      <ul>
                        <li>
                          Grade: <input type="text" name="grade" value={formValues.basicInfo.grade} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                        </li>
                        <li>
                          Exam Score: <input type="text" name="cetPercentile" value={formValues.basicInfo.cetPercentile} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                        </li>
                        <li>
                          Class Type: <input type="text" name="classType" value={formValues.basicInfo.classType} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                        </li>
                        <li>
                          Language: <input type="text" name="languagesSpoken" value={formValues.basicInfo.languagesSpoken?.join(', ')} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                        </li>
                        <li>
                          Category: <input type="text" name="category" value={formValues.basicInfo.category} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                        </li>
                        <li>
                          College: <input type="text" name="college" value={formValues.basicInfo.college} onChange={(e) => handleInputChange('basicInfo', null, e)} />
                        </li>
                      </ul>
                      <button onClick={() => handleSave('basicInfo')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        <li>Grade: {studentBasicDetails?.grade}</li>
                        <li>Exam Score: {studentBasicDetails?.cetPercentile}</li>
                        <li>Class Type: {studentBasicDetails?.classType}</li>
                        <li>Language: {studentBasicDetails?.languagesSpoken?.join(', ')}</li>
                        <li>Category: {studentBasicDetails?.category}</li>
                        <li>College: {studentBasicDetails?.college}</li>
                      </ul>
                      <button onClick={() => handleEditToggle('basicInfo')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>About</h5>
                  {editMode.about ? (
                    <div>
                      <ul>
                        {formValues.about.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="about" value={item?.about} onChange={(e) => handleInputChange('about', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('about')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileAboutSection?.map((item, index) => (
                          <li key={index}>{item?.about}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('about')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>City of Coaching</h5>
                  {editMode.cityOfCoaching ? (
                    <div>
                      <ul>
                        {formValues.cityOfCoaching.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="cityOfCoaching" value={item?.cityOfCoaching} onChange={(e) => handleInputChange('cityOfCoaching', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('cityOfCoaching')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileCityOfCoaching?.map((item, index) => (
                          <li key={index}>{item?.cityOfCoaching}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('cityOfCoaching')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Exam Score Details</h5>
                  {editMode.scoreDetails ? (
                    <div>
                      <ul>
                        {formValues.scoreDetails.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="scoreDetails" value={item?.scoreDetails} onChange={(e) => handleInputChange('scoreDetails', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('scoreDetails')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileScoreDetails?.map((item, index) => (
                          <li key={index}>{item?.scoreDetails}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('scoreDetails')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Other Exam Scores</h5>
                  {editMode.otherExamScores ? (
                    <div>
                      <ul>
                        {formValues.otherExamScores.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="otherExamScores" value={item?.otherExamScores} onChange={(e) => handleInputChange('otherExamScores', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('otherExamScores')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileOtherExamScores?.map((item, index) => (
                          <li key={index}>{item?.otherExamScores}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('otherExamScores')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Activities and Achievements</h5>
                  {editMode.activityAndAchievements ? (
                    <div>
                      <ul>
                        {formValues.activityAndAchievements.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="activityAndAchievements" value={item?.activityAndAchievements} onChange={(e) => handleInputChange('activityAndAchievements', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('activityAndAchievements')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileActivityAndAchievements?.map((item, index) => (
                          <li key={index}>{item?.activityAndAchievements}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('activityAndAchievements')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>Tutoring Experience</h5>
                  {editMode.tutoringExperience ? (
                    <div>
                      <ul>
                        {formValues.tutoringExperience.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="tutoringExperience" value={item?.tutoringExperience} onChange={(e) => handleInputChange('tutoringExperience', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('tutoringExperience')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileTutoringExperience?.map((item, index) => (
                          <li key={index}>{item?.tutoringExperience}</li>
                        ))}
                      </ul>
                      <button onClick={() => handleEditToggle('tutoringExperience')}>Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card mt-4 zoom-card">
                <div className="card-body">
                  <h5>External Links</h5>
                  {editMode.externalLinks ? (
                    <div>
                      <ul>
                        {formValues.externalLinks.map((item, index) => (
                          <li key={index}>
                            <input type="text" name="externalLinks" value={item?.externalLinks} onChange={(e) => handleInputChange('externalLinks', index, e)} />
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handleSave('externalLinks')}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <ul>
                        {studentProfile?.studentProfileExternalLinks?.map((item, index) => (
                          <li key={index}>{item?.externalLinks}</li>
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
