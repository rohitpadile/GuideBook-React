import React, { useState } from 'react';
import axios from 'axios';

function PhotoUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/api/photos/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            alert('File uploaded successfully: ' + response.data);
        })
        .catch(error => {
            console.error('There was an error uploading the file!', error);
        });
    };

    return (
        <div className="mt-10">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Photo</button>
        </div>
    );
}

export default PhotoUpload;
