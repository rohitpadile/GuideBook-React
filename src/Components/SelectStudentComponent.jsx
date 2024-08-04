import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllLanguageNames, getAllStudentClassTypes, getBranchesForCollege, getFilteredStudentList, getAllStudentCategories } from '../Services/apiServiceAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SelectStudentComponentCss.css'; // Import the CSS file
import { S3_PROFILE_PHOTO_BASE_URL } from '../constants/s3url'; // Import the constant

const SelectStudentComponent = () => {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [branchNames, setBranchNames] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  const [studentClassTypes, setStudentClassTypes] = useState([]);
  const [studentCategories, setStudentCategories] = useState([]);
  const [minGrade, setMinGrade] = useState('7.0');
  const [minCetPercentile, setMinCetPercentile] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedStudentClassType, setSelectedStudentClassType] = useState('');
  const [selectedStudentCategory, setSelectedStudentCategory] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDropdownValues();
      await handleFilterChange(); // Apply filters after fetching dropdown values
    };

    fetchData();
  }, [collegeName]);

  const fetchDropdownValues = async () => {
    try {
      const branchNamesList = await getBranchesForCollege(collegeName);
      setBranchNames(['ALL', ...branchNamesList]);
      if (branchNamesList.length > 0) {
        setSelectedBranch('ALL'); // Default to 'ALL'
      }

      const languageNamesList = await getAllLanguageNames();
      setLanguageNames(['ALL', ...languageNamesList]);
      if (languageNamesList.length > 0) {
        setSelectedLanguage('ALL'); // Default to 'ALL'
      }

      const studentClassTypesList = await getAllStudentClassTypes();
      setStudentClassTypes(['ALL', ...studentClassTypesList]);
      if (studentClassTypesList.length > 0) {
        setSelectedStudentClassType('ALL'); // Default to 'ALL'
      }

      const studentCategoriesList = await getAllStudentCategories();
      setStudentCategories(['ALL', ...studentCategoriesList]);
      if (studentCategoriesList.length > 0) {
        setSelectedStudentCategory('ALL'); // Default to 'ALL'
      }
    } catch (error) {
      console.error('Error fetching dropdown values:', error);
    }
  };

  const handleFilterChange = async () => {
    try {
      const filters = {
        collegeName,
        branchName: selectedBranch === 'ALL' ? '' : selectedBranch,
        minGrade: parseFloat(minGrade),
        minCetPercentile: parseFloat(minCetPercentile),
        studentClassType: selectedStudentClassType === 'ALL' ? '' : selectedStudentClassType,
        languageName: selectedLanguage === 'ALL' ? '' : selectedLanguage,
        studentCategory: selectedStudentCategory === 'ALL' ? '' : selectedStudentCategory,
      };

      const response = await getFilteredStudentList(filters);
      setStudents(response && response.length > 0 ? response : []);
    } catch (error) {
      console.error('Error filtering students:', error);
    }
  };

  const handleStudentClick = (student) => {
    navigate('/studentProfile', { state: { student } });
  };

  return (
    <div className="select-student-container">
      <div className="filter-options">
        <div className="filter-item">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            className="form-control"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            {branchNames.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            className="form-control"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languageNames.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="studentClassType">Student Class Type</label>
          <select
            id="studentClassType"
            className="form-control"
            value={selectedStudentClassType}
            onChange={(e) => setSelectedStudentClassType(e.target.value)}
          >
            {studentClassTypes.map((classType, index) => (
              <option key={index} value={classType}>
                {classType}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="studentCategory">Student Category</label>
          <select
            id="studentCategory"
            className="form-control"
            value={selectedStudentCategory}
            onChange={(e) => setSelectedStudentCategory(e.target.value)}
          >
            {studentCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div> 
        <div className="filter-item">
          <label htmlFor="minGrade">Minimum Grade</label>
          <select
            id="minGrade"
            className="form-control"
            value={minGrade}
            onChange={(e) => setMinGrade(e.target.value)}
          >
            <option value="7.0">7.0</option>
            <option value="7.5">7.5</option>
            <option value="8.0">8.0</option>
            <option value="8.5">8.5</option>
            <option value="9.0">9.0</option>
            <option value="9.5">9.5</option>
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="minCetPercentile">Minimum Score</label>
          <input
            type="number"
            className="form-control"
            id="minCetPercentile"
            value={minCetPercentile}
            onChange={(e) => setMinCetPercentile(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <button type="button" className="btn btn-primary" onClick={handleFilterChange}>
            Apply Filters
          </button>
        </div>
      </div>
      {students.length > 0 && (
        <div className="students-list mt-4">
          <h5>Students</h5>
          <div className="row">
            {students.map((student, index) => {
              const profilePhotoUrl = `${S3_PROFILE_PHOTO_BASE_URL}${student.studentWorkEmail}.jpg`;
              return (
                <div key={index} className="col-md-3 mb-4">
                  <div className="card" onClick={() => handleStudentClick(student)}>
                    <img
                      src={profilePhotoUrl}
                      className="card-img-top"
                      alt="Student Profile"
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title">{student.studentName}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectStudentComponent;
