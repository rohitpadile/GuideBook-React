import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudents } from '../Services/apiServiceRegular'; // Corrected path
import { getBranches } from '../Services/apiServiceAdmin'; // Assuming this service exists for fetching branches
import { getLanguages } from '../Services/apiServiceLanguages'; // Assuming this service exists for fetching languages

const SelectStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState({ branch: '', grade: '', cetPercentile: '', yearOfStudy: '', languages: [] });
    const [branches, setBranches] = useState([]);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
    const { collegeId } = useParams();

    useEffect(() => {
        fetchStudents();
        fetchBranches();
        fetchLanguages();
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

    const fetchBranches = async () => {
        try {
            const response = await getBranches(collegeId); // Adjust according to your API
            setBranches(response.data);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const fetchLanguages = async () => {
        try {
            const response = await getLanguages(); // Adjust according to your API
            setLanguages(response.data);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    const handleStudentClick = (student) => {
        // navigate(`/student-profile/${student.studentId}`);
        console.log("Navigating to student profile page with student:", student);
    };

    const applyFilter = () => {
        let filtered = students;
        if (filter.branch) {
            filtered = filtered.filter(student => student.branch.branchName.includes(filter.branch));
        }
        if (filter.grade) {
            filtered = filtered.filter(student => student.grade.toString().includes(filter.grade));
        }
        if (filter.cetPercentile) {
            filtered = filtered.filter(student => student.cetPercentile.toString().includes(filter.cetPercentile));
        }
        if (filter.yearOfStudy) {
            filtered = filtered.filter(student => student.yearOfStudy === filter.yearOfStudy);
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
        const { options } = e.target;
        const selectedLanguages = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
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
                            <option value="">All Branches</option>
                            {branches.map(branch => (
                                <option key={branch.branchId} value={branch.branchName}>{branch.branchName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="yearOfStudy">Year of Study:</label>
                        <select
                            id="yearOfStudy"
                            name="yearOfStudy"
                            className="form-control"
                            value={filter.yearOfStudy}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Years</option>
                            <option value="SY">Second Year</option>
                            <option value="TY">Third Year</option>
                            <option value="DSY">Final Year</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="languages">Languages Spoken:</label>
                        <select
                            id="languages"
                            name="languages"
                            className="form-control"
                            size="5"
                            multiple
                            onChange={handleLanguageChange}
                        >
                            {languages.map(lang => (
                                <option key={lang.languageId} value={lang.languageName}>{lang.languageName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {filteredStudents.map(student => (
                            <div key={student.studentId} className="col-md-4 mb-4">
                                <div className="card h-100 border-primary shadow-sm" onClick={() => handleStudentClick(student)} style={{ cursor: 'pointer' }}>
                                    <img src={`/${student.studentName.toLowerCase().replace(/\s/g, '')}.jpg`} className="card-img-top" alt={student.studentName} style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{student.studentName}</h5>
                                        <p className="card-text">Branch: {student.branch.branchName}</p>
                                        <p className="card-text">Grade: {student.grade}</p>
                                        <p className="card-text">CET Percentile: {student.cetPercentile}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectStudentComponent;
