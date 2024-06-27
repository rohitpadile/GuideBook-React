import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudents } from '../Services/apiServiceRegular'; // Assuming correct path

const SelectStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState({
        branch: '',
        grade: '',
        cetPercentile: '',
        yearOfStudy: '',
        languages: []
    });
    const navigate = useNavigate();
    const { collegeId } = useParams();

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, students]);

    const fetchStudents = async () => {
        try {
            const response = await getStudents(collegeId);
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleStudentClick = (student) => {
        // navigate(`/student-profile/${student.studentId}`);
        console.log("Navigating to student profile page with student:", student);
    };

    const applyFilter = () => {
        let filtered = students;

        if (filter.branch) {
            filtered = filtered.filter(student => student.branch.branchName.toLowerCase().includes(filter.branch.toLowerCase()));
        }
        if (filter.grade) {
            filtered = filtered.filter(student => student.grade >= parseFloat(filter.grade));
        }
        if (filter.cetPercentile) {
            filtered = filtered.filter(student => student.cetPercentile >= parseFloat(filter.cetPercentile));
        }
        if (filter.yearOfStudy) {
            filtered = filtered.filter(student => student.yearOfStudy.toString() === filter.yearOfStudy);
        }
        if (filter.languages.length > 0) {
            filtered = filtered.filter(student => filter.languages.every(lang => student.languages.includes(lang)));
        }

        setFilteredStudents(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    };

    const handleLanguageChange = (e) => {
        const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
        setFilter(prevFilter => ({ ...prevFilter, languages: selectedLanguages }));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Select Student</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <select
                            id="branch"
                            name="branch"
                            className="form-control"
                            value={filter.branch}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Branch</option>
                            {/* Replace with actual branch options */}
                            <option value="branch1">Branch 1</option>
                            <option value="branch2">Branch 2</option>
                            <option value="branch3">Branch 3</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="grade">Above Grade:</label>
                        <input
                            type="number"
                            id="grade"
                            name="grade"
                            className="form-control"
                            value={filter.grade}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="cetPercentile">Above CET Percentile:</label>
                        <input
                            type="number"
                            id="cetPercentile"
                            name="cetPercentile"
                            className="form-control"
                            value={filter.cetPercentile}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="yearOfStudy">Year of Study:</label>
                        <select
                            id="yearOfStudy"
                            name="yearOfStudy"
                            className="form-control"
                            value={filter.yearOfStudy}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Year</option>
                            {/* Replace with actual year options */}
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="languages">Languages Spoken:</label>
                <select
                    id="languages"
                    name="languages"
                    className="form-control"
                    size="5"
                    onChange={handleLanguageChange}
                >
                    {/* Replace with actual language options */}
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="spanish">Spanish</option>
                </select>
            </div>
            <div className="row mt-4">
                {filteredStudents.map(student => (
                    <div key={student.studentId} className="col-md-4 mb-4">
                        <div className="card h-100 border-primary shadow-sm" onClick={() => handleStudentClick(student)} style={{ cursor: 'pointer' }}>
                            {/* Replace with appropriate image source */}
                            <img src={`/${student.studentName.toLowerCase().replace(/\s/g, '')}.jpg`} className="card-img-top" alt={student.studentName} style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                            <div className="card-body">
                                <h5 className="card-title">{student.studentName}</h5>
                                <p className="card-text">Branch: {student.branch.branchName}</p>
                                <p className="card-text">Grade: {student.grade}</p>
                                <p className="card-text">CET Percentile: {student.cetPercentile}</p>
                                <p className="card-text">Year of Study: {student.yearOfStudy}</p>
                                <p className="card-text">Languages: {student.languages.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectStudentComponent;
