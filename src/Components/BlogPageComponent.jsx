import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for HTTP requests

const BlogPageComponent = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Replace with actual API endpoint to fetch individual blog by blogId
    axios.get(`/api/blogs/${blogId}`)
      .then(response => {
        setBlog(response.data); // Assuming response.data is the blog object
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>; // You can add a loading spinner or message
  }

  return (
    <div className="blog-page">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Written by: {blog.author}</p>
      {/* Add more details or styling as needed */}
    </div>
  );
};

export default BlogPageComponent;
