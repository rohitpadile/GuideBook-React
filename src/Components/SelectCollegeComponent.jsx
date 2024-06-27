// src/components/SelectCollegeComponent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../Context/BranchContext'; // Corrected path
import { getColleges } from '../Services/apiServiceRegular'; // Corrected path
import { getAllBranches } from '../Services/apiServiceAdmin';

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
        // navigate(`/select-student/${college.collegeId}`);
        console.log("Navigating to select student page with college:", college);
    };

    return (
        <div>
            <h1>Select College</h1>
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
