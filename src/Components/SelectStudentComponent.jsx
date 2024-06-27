import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudents } from '../Services/apiServiceRegular'; // Corrected path

const SelectStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState({ branch: '', grade: '', cetPercentile: '' });
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
            filtered = filtered.filter(student => student.branch.branchName.includes(filter.branch));
        }
        if (filter.grade) {
            filtered = filtered.filter(student => student.grade.toString().includes(filter.grade));
        }
        if (filter.cetPercentile) {
            filtered = filtered.filter(student => student.cetPercentile.toString().includes(filter.cetPercentile));
        }
        setFilteredStudents(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Select Student</h1>
            <div className="d-flex justify-content-center mb-4">
                <input
                    type="text"
                    name="branch"
                    placeholder="Filter by branch"
                    className="form-control mx-2"
                    value={filter.branch}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="grade"
                    placeholder="Filter by grade"
                    className="form-control mx-2"
                    value={filter.grade}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="cetPercentile"
                    placeholder="Filter by CET percentile"
                    className="form-control mx-2"
                    value={filter.cetPercentile}
                    onChange={handleFilterChange}
                />
            </div>
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
    );
};

export default SelectStudentComponent;
