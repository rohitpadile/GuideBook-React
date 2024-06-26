// src/components/SelectCollegeComponent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from './context/BranchContext';
import { getColleges } from './src/Services/apiServiceRegular';
import { getAllBranches } from './src/Services/apiServiceAdmin'; // Use the updated path

const SelectCollegeComponent = () => {
    const [colleges, setColleges] = useState([]);
    const [branches, setBranches] = useState([]);
    const { setSelectedBranch } = useBranch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchColleges();
        fetchBranches();
    }, []);

    const fetchColleges = async () => {
        try {
            const response = await getColleges();
            setColleges(response.data);
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await getAllBranches();
            setBranches(response.data);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
    };

    const handleCollegeClick = (college) => {
        navigate(`/select-student/${college.collegeId}`);
    };

    return (
        <div>
            <h1>Select College</h1>
            <div>
                <label>
                    Branch:
                    <select onChange={handleBranchChange}>
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch.branchId} value={branch.branchName}>
                                {branch.branchName}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {colleges.map(college => (
                    <div key={college.collegeId} style={styles.collegeBox} onClick={() => handleCollegeClick(college)}>
                        <div style={{ ...styles.image, backgroundImage: `url(${college.photo})` }} />
                        <h2>{college.collegeName}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    collegeBox: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        width: '200px',
        textAlign: 'center',
        position: 'relative',
        cursor: 'pointer',
    },
    image: {
        height: '150px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px 8px 0 0',
    }
};

export default SelectCollegeComponent;
