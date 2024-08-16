import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for HTTP requests

const BlogListComponent = ({ studentId }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Replace with actual API endpoint to fetch blogs for a student
    axios.get(`/api/students/${studentId}/blogs`)
      .then(response => {
        setBlogs(response.data); // Assuming response.data is an array of blogs
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, [studentId]);

  return (
    <div className="blog-list" align="center">
      {/* <h2>Student Blogs : Coming Soon</h2> */}
      {blogs.map(blog => (
        <div key={blog.id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <Link to={`/blogs/${blog.id}`} className="btn btn-primary">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogListComponent;
