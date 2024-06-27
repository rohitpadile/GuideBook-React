import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../Context/BranchContext'; // Corrected path
import { getColleges } from '../Services/apiServiceRegular'; // Corrected path

const SelectCollegeComponent = () => {
    const [colleges, setColleges] = useState([]);
    const { setSelectedBranch } = useBranch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            const response = await getColleges();
            setColleges(response.data);
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    const handleCollegeClick = (college) => {
        navigate(`/selectStudent/${college.collegeId}`);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Select College</h1>
            <div className="row">
                {colleges.map(college => (
                    <div key={college.collegeId} className="col-md-4 mb-4">
                        <div className="card h-100 border-primary shadow-sm" onClick={() => handleCollegeClick(college)} style={{ cursor: 'pointer' }}>
                            <img src={`/${college.collegeName.toLowerCase().replace(/\s/g, '')}.jpg`} className="card-img-top" alt={college.collegeName} style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                            <div className="card-body">
                                <h5 className="card-title">{college.collegeName}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectCollegeComponent;
