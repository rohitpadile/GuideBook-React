import React, { useState, useEffect } from 'react';

const SelectCollegeComponent = () => {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [branchFilter, setBranchFilter] = useState('');

    useEffect(() => {
        fetchColleges();
    }, []);

    useEffect(() => {
        filterColleges();
    }, [branchFilter]);

    const fetchColleges = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/colleges'); // Replace with your backend API endpoint
            const data = await response.json();
            setColleges(data);
            setFilteredColleges(data);
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    const filterColleges = () => {
        let filtered = colleges;
        if (branchFilter) {
            filtered = filtered.filter(college => college.branch.includes(branchFilter));
        }
        setFilteredColleges(filtered);
    };

    const branches = [...new Set(colleges.map(college => college.branch))]; // Get unique branches

    return (
        <div>
            <h1>Select College</h1>
            <div>
                <label>
                    Branch:
                    <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredColleges.map(college => (
                    <div key={college.id} style={styles.collegeBox}>
                        <div style={{ ...styles.image, backgroundImage: `url(${college.photo})` }} />
                        <h2>{college.name}</h2>
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
    },
    image: {
        height: '150px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px 8px 0 0',
    }
};

export default SelectCollegeComponent;
