import React, { useState, useEffect } from 'react';
import {
  getAllBranches,
  getAllColleges,
  getAllLanguages,
  getAllStudentCategories,
  getAllStudentClassTypes,
  getStudentBasicDetails,
  updateStudent,
  deactivateStudent,
  activateStudent,
  trLogin
} from '../../Services/teamRecruiterApiService';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/TR/TRStudentApplicationFormCss.css';

const TRUpdateStudentApplicationForm = () => {
  const location = useLocation(); // Get location
  const navigate = useNavigate();
  const { TRUserFirstName, TRUserLastName, password } = location.state || {}; // Retrieve state

  const [studentDetails, setStudentDetails] = useState({
    studentName: '',
    studentMis: '',
    studentWorkEmail: '',
    studentPublicEmail: '',
    studentCollegeName: '',
    studentBranchName: '',
    studentCetPercentile: '',
    studentGrade: '',
    studentClassType: '',
    studentCategoryName: '',
    studentLanguageNames: []
  });

  const [branches, setBranches] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [studentCategories, setStudentCategories] = useState([]);
  const [studentClassTypes, setStudentClassTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isStudentFound, setIsStudentFound] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginCode, setLoginCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchesData = await getAllBranches();
        const collegesData = await getAllColleges();
        const languagesData = await getAllLanguages();
        const studentCategoriesData = await getAllStudentCategories();
        const studentClassTypesData = await getAllStudentClassTypes();

        setBranches(branchesData);
        setColleges(collegesData);
        setLanguages(languagesData);
        setStudentCategories(studentCategoriesData);
        setStudentClassTypes(studentClassTypesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const login = async () => {
      try {
        const response = await trLogin({
          trUserFirstName: TRUserFirstName || '',
          trUserLastName: TRUserLastName || '',
          trUserPassword: password || ''
        });
        if (response.status === 200) {
          setLoginMessage('Login successful');
          setLoginCode(1);
        } else {
          setLoginMessage('Access Failed');
          setLoginCode(0);
        }
      } catch (error) {
        setLoginMessage('Access Failed');
        setLoginCode(0);
      }
    };

    login();
  }, [TRUserFirstName, TRUserLastName, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value || '' // Ensure value is never null
    }));
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
    setStudentDetails(prevDetails => ({
      ...prevDetails,
      studentLanguageNames: selectedLanguages
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const studentData = await getStudentBasicDetails(studentDetails.studentWorkEmail);
      setStudentDetails(prevDetails => ({
        ...prevDetails,
        ...studentData
      }));
      setIsStudentFound(true);
    } catch (error) {
      console.error('Error fetching student details:', error);
      alert('Student not found or error occurred');
      setIsStudentFound(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await updateStudent(studentDetails);
      alert('Student details updated successfully');
    } catch (error) {
      console.error('Error updating student details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateStudent({ studentWorkEmail: studentDetails.studentWorkEmail });
      alert('Student deactivated successfully');
      setIsStudentFound(false);
    } catch (error) {
      console.error('Error deactivating student:', error);
      alert('Failed to deactivate student');
    }
  };

  const handleActivate = async () => {
    try {
      await activateStudent({ studentWorkEmail: studentDetails.studentWorkEmail });
      alert('Student activated successfully');
      setIsStudentFound(false);
    } catch (error) {
      console.error('Error activating student:', error);
      alert('Failed to activate student');
    }
  };

  const isFormValid = () => {
    const {
      studentName,
      studentMis,
      studentWorkEmail,
      studentCollegeName,
      studentBranchName,
      studentCetPercentile,
      studentGrade,
      studentClassType,
      studentCategoryName,
      studentLanguageNames
    } = studentDetails;
    return (
      studentName &&
      studentMis &&
      studentWorkEmail &&
      studentCollegeName &&
      studentBranchName &&
      studentCetPercentile &&
      studentGrade &&
      studentClassType &&
      studentCategoryName &&
      studentLanguageNames.length > 0
    );
  };
  
    const navigateToStudentForm = () => {
    try {
      navigate('/TRStudentApplicationForm', {
        state: {
          TRUserFirstName,
          TRUserLastName,
          password
        }
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  if (loginCode !== 1) {
    return <p>{loginMessage}</p>;
  }

  return (//return component code
    <div className="student-application-form">
      <h2>Update Student Application Form</h2>
      <button onClick={navigateToStudentForm}>Go to Student Application Form</button>
      <div className="form-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>Work Email:</label>
            <input
              type="email"
              name="studentWorkEmail"
              value={studentDetails.studentWorkEmail || ''} // Ensure value is never null
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="search-button" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        {isStudentFound && (
          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="studentName"
                value={studentDetails.studentName || ''} // Ensure value is never null
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>MIS:</label>
              <input
                type="number"
                name="studentMis"
                value={studentDetails.studentMis || ''} // Ensure value is never null
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Public Email:</label>
              <input
                type="email"
                name="studentPublicEmail"
                value={studentDetails.studentPublicEmail || ''} // Ensure value is never null
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>College:</label>
              <select
                name="studentCollegeName"
                value={studentDetails.studentCollegeName || ''} // Ensure value is never null
                onChange={handleChange}
                required
              >
                <option value="">Select College</option>
                {colleges.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Branch:</label>
              <select
                name="studentBranchName"
                value={studentDetails.studentBranchName || ''} // Ensure value is never null
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>CET Percentile:</label>
              <input
                type="number"
                step="0.01"
                name="studentCetPercentile"
                value={studentDetails.studentCetPercentile || ''} // Ensure value is never null
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Grade:</label>
              <input
                type="number"
                step="0.01"
                name="studentGrade"
                value={studentDetails.studentGrade || ''} // Ensure value is never null
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Class Type:</label>
              <select
                name="studentClassType"
                value={studentDetails.studentClassType || ''} // Ensure value is never null
                onChange={handleChange}
                required
              >
                <option value="">Select Class Type</option>
                {studentClassTypes.map((classType) => (
                  <option key={classType} value={classType}>
                    {classType}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                name="studentCategoryName"
                value={studentDetails.studentCategoryName || ''} // Ensure value is never null
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {studentCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Languages:</label>
              <select
                multiple
                name="studentLanguageNames"
                value={studentDetails.studentLanguageNames || []} // Ensure value is never null
                onChange={handleLanguagesChange}
                required
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              className="deactivate-button"
              onClick={handleDeactivate}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deactivating...' : 'Deactivate'}
            </button>
            <button
              type="button"
              className="activate-button"
              onClick={handleActivate}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Activating...' : 'Activate'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TRUpdateStudentApplicationForm;
