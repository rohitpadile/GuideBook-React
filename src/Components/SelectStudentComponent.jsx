import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllLanguageNames, getAllStudentClassTypes, getAllBranchNames, getFilteredStudentList } from '../Services/apiServiceAdmin';

const SelectStudentComponent = () => {
  const { collegeName } = useParams();
  const [branchNames, setBranchNames] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  const [studentClassTypes, setStudentClassTypes] = useState([]);
  const [minGrade, setMinGrade] = useState(0);
  const [minCetPercentile, setMinCetPercentile] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedStudentClassType, setSelectedStudentClassType] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchDropdownValues();
  }, []);

  const fetchDropdownValues = async () => {
    try {
      const branchNamesList = await getAllBranchNames();
      setBranchNames(branchNamesList);

      const languageNamesList = await getAllLanguageNames();
      setLanguageNames(languageNamesList);

      const studentClassTypesList = await getAllStudentClassTypes();
      setStudentClassTypes(studentClassTypesList);
    } catch (error) {
      console.error('Error fetching dropdown values:', error);
    }
  };

  const handleFilterChange = async () => {
    try {
      const filters = {
        branchName: selectedBranch,
        minGrade: parseFloat(minGrade),
        minCetPercentile: parseFloat(minCetPercentile),
        studentClassType: selectedStudentClassType,
        languageName: selectedLanguage,
      };

      const response = await getFilteredStudentList(filters);
      setStudents(response.studentNameList || []);
    } catch (error) {
      console.error('Error filtering students:', error);
    }
  };

  return (
    <div className="student-list-container">
      <div className="filters">
        <label>Branch:</label>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select Branch</option>
          {branchNames.map((branch, index) => (
            <option key={index} value={branch}>{branch}</option>
          ))}
        </select>

        <label>Language:</label>
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="">Select Language</option>
          {languageNames.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>

        <label>Student Class Type:</label>
        <select value={selectedStudentClassType} onChange={(e) => setSelectedStudentClassType(e.target.value)}>
          <option value="">Select Class Type</option>
          {studentClassTypes.map((classType, index) => (
            <option key={index} value={classType}>{classType}</option>
          ))}
        </select>

        <label>Minimum Grade:</label>
        <input type="number" value={minGrade} onChange={(e) => setMinGrade(e.target.value)} />

        <label>Minimum CET Percentile:</label>
        <input type="number" value={minCetPercentile} onChange={(e) => setMinCetPercentile(e.target.value)} />

        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>

      <div className="student-circles">
        {students.map((student, index) => (
          <div key={index} className="student-circle">
            <img src={student.profilePhotoUrl} alt="Student Profile" />
            <p>{student.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStudentComponent;
