import React, { useState, useEffect } from 'react';
import {
  addStudent,
  getAllBranches,
  getAllColleges,
  getAllLanguages,
  getAllStudentCategories,
  getAllStudentClassTypes
} from '../../Services/teamRecruiterApiService';
import '../../css/TR/TRStudentApplicationFormCss.css';

const TRStudentApplicationForm = () => {
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
  const [lastSavedStudent, setLastSavedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await addStudent(studentDetails);
      alert('Student details submitted successfully');
      setLastSavedStudent(studentDetails);
      setStudentDetails({
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
    } catch (error) {
      console.error('Error submitting student details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="student-application-form">
      <h2>Student Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="studentName" value={studentDetails.studentName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>MIS:</label>
          <input type="number" name="studentMis" value={studentDetails.studentMis} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Work Email:</label>
          <input type="email" name="studentWorkEmail" value={studentDetails.studentWorkEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Public Email:</label>
          <input type="email" name="studentPublicEmail" value={studentDetails.studentPublicEmail} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>College:</label>
          <select name="studentCollegeName" value={studentDetails.studentCollegeName} onChange={handleChange} required>
            <option value="">Select College</option>
            {colleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Branch:</label>
          <select name="studentBranchName" value={studentDetails.studentBranchName} onChange={handleChange} required>
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>CET Percentile:</label>
          <input type="number" step="0.01" name="studentCetPercentile" value={studentDetails.studentCetPercentile} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <input type="number" step="0.01" name="studentGrade" value={studentDetails.studentGrade} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Class Type:</label>
          <select name="studentClassType" value={studentDetails.studentClassType} onChange={handleChange} required>
            <option value="">Select Class Type</option>
            {studentClassTypes.map(classType => (
              <option key={classType} value={classType}>{classType}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select name="studentCategoryName" value={studentDetails.studentCategoryName} onChange={handleChange} required>
            <option value="">Select Category</option>
            {studentCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Languages Spoken:</label>
          <select multiple name="studentLanguageNames" value={studentDetails.studentLanguageNames} onChange={handleLanguagesChange} required>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={!isFormValid() || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {lastSavedStudent && (
        <div className="last-saved-student-card">
          <h3>Last Saved Student</h3>
          <p><strong>Name:</strong> {lastSavedStudent.studentName}</p>
          <p><strong>MIS:</strong> {lastSavedStudent.studentMis}</p>
          <p><strong>Work Email:</strong> {lastSavedStudent.studentWorkEmail}</p>
          <p><strong>Public Email:</strong> {lastSavedStudent.studentPublicEmail}</p>
          <p><strong>College:</strong> {lastSavedStudent.studentCollegeName}</p>
          <p><strong>Branch:</strong> {lastSavedStudent.studentBranchName}</p>
          <p><strong>CET Percentile:</strong> {lastSavedStudent.studentCetPercentile}</p>
          <p><strong>Grade:</strong> {lastSavedStudent.studentGrade}</p>
          <p><strong>Class Type:</strong> {lastSavedStudent.studentClassType}</p>
          <p><strong>Category:</strong> {lastSavedStudent.studentCategoryName}</p>
          <p><strong>Languages Spoken:</strong> {lastSavedStudent.studentLanguageNames.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default TRStudentApplicationForm;
