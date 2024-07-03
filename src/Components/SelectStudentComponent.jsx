import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllLanguageNames, getAllStudentClassTypes, getBranchesForCollege, getFilteredStudentList } from '../Services/apiServiceAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';

const SelectStudentComponent = () => {
  const { collegeName } = useParams();
  const [branchNames, setBranchNames] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  const [studentClassTypes, setStudentClassTypes] = useState([]);
  const [minGrade, setMinGrade] = useState('7.0'); // Set initial value as string '7.0'
  const [minCetPercentile, setMinCetPercentile] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedStudentClassType, setSelectedStudentClassType] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchDropdownValues();
  }, [collegeName]);

  const fetchDropdownValues = async () => {
    try {
      const branchNamesList = await getBranchesForCollege(collegeName);
      setBranchNames(branchNamesList);
      if (branchNamesList.length > 0) {
        setSelectedBranch(branchNamesList[0]);
      }

      const languageNamesList = await getAllLanguageNames();
      setLanguageNames(languageNamesList);
      if (languageNamesList.length > 0) {
        setSelectedLanguage(languageNamesList[0]);
      }

      const studentClassTypesList = await getAllStudentClassTypes();
      setStudentClassTypes(studentClassTypesList);
      if (studentClassTypesList.length > 0) {
        setSelectedStudentClassType(studentClassTypesList[0]);
      }
    } catch (error) {
      console.error('Error fetching dropdown values:', error);
    }
  };

  const handleFilterChange = async () => {
    try {
      const filters = {
        collegeName,
        branchName: selectedBranch,
        minGrade: parseFloat(minGrade),
        minCetPercentile: parseFloat(minCetPercentile),
        studentClassType: selectedStudentClassType,
        languageName: selectedLanguage,
      };
  
      const response = await getFilteredStudentList(filters);
      console.log('Response:', response); // Check the structure of the response
  
      if (response && response.length > 0) {
        setStudents(response); // Set students state with the received data
      } else {
        setStudents([]); // Set students to empty array if no data received
      }
    } catch (error) {
      console.error('Error filtering students:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h4>Filter Students</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-row mb-3 d-flex justify-content-between align-items-center" style={{ fontSize: '0.8rem', gap: '10px' }}>
              <div className="form-group col-md-2">
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
              <div className="form-group col-md-2">
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
              <div className="form-group col-md-2">
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
              <div className="form-group col-md-2">
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
              <div className="form-group col-md-2">
                <label htmlFor="minCetPercentile">Minimum CET Percentile</label>
                <input
                  type="number"
                  className="form-control"
                  id="minCetPercentile"
                  value={minCetPercentile}
                  onChange={(e) => setMinCetPercentile(e.target.value)}
                />
              </div>
              <div className="form-group col-md-2 d-flex align-items-end">
                <button type="button" className="btn btn-primary" onClick={handleFilterChange}>
                  Apply Filters
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <h5>Students</h5>
        <div className="row">
          {students && students.map((student, index) => {
            const profilePhotoUrl = `/studentProfilePhotos/${student.studentMis}.jpg`;
            console.log('Profile Photo URL:', profilePhotoUrl); // Debugging: Log profile photo URL
            return (
              <div key={index} className="col-md-3 mb-4">
                <div className="card" style={{ fontSize: '14px' }}>
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
    </div>
  );
};

export default SelectStudentComponent;
