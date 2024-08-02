import React, { useState, useEffect } from 'react';
import {
  getAllBranches,
  getAllColleges,
  getAllLanguages,
  getAllStudentCategories,
  getAllStudentClassTypes,
  getStudentBasicDetails,
  updateStudent
} from '../../Services/teamRecruiterApiService';
import '../../css/TR/TRStudentApplicationFormCss.css';

const TRUpdateStudentApplicationForm = () => {
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
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

  return (
    <div className="student-application-form">
      <h2>Update Student Application Form</h2>
      <div className="form-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>Work Email:</label>
            <input
              type="email"
              name="studentWorkEmail"
              value={studentDetails.studentWorkEmail}
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
                value={studentDetails.studentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>MIS:</label>
              <input
                type="number"
                name="studentMis"
                value={studentDetails.studentMis}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Public Email:</label>
              <input
                type="email"
                name="studentPublicEmail"
                value={studentDetails.studentPublicEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>College:</label>
              <select
                name="studentCollegeName"
                value={studentDetails.studentCollegeName}
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
                value={studentDetails.studentBranchName}
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
                value={studentDetails.studentCetPercentile}
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
                value={studentDetails.studentGrade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Class Type:</label>
              <select
                name="studentClassType"
                value={studentDetails.studentClassType}
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
                value={studentDetails.studentCategoryName}
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
              <label>Languages Spoken:</label>
              <select
                multiple
                name="studentLanguageNames"
                value={studentDetails.studentLanguageNames}
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
          </form>
        )}
      </div>
    </div>
  );
};

export default TRUpdateStudentApplicationForm;
