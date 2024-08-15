import React from 'react';
import '../css/AboutUsCss.css'; // Create and import your CSS file

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Rohit Padile',
      role: 'Founder & CEO',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/rohitp22.elec@coeptech.ac.in.jpg',
      // description: 'Brief description about you.',
    },
    {
      name: 'Bhavesh Manoj Kapure',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/bhavesh.guidebookx@gmail.com.jpg',
      // description: 'Brief description about team member 1.',
    },
    {
      name: 'Chetan Pathade',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/chetan.guidebookx@gmail.com.jpg',
      // description: 'Brief description about team member 2.',
    },
    {
      name: 'Vishwambhar Laxmikant Joshi',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/vishwambhar.guidebookx@gmail.com.jpg',
      // description: 'Brief description about team member 2.',
    },
    {
      name: 'Ajay Sayanna Karhade',
      role: 'Operations',
      // imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/ajay.guidebookx@gmail.com.jpg',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/personicon.jpg',
      // description: 'Brief description about team member 2.',
    },
    {
      name: 'Ayush Shailesh Agrawal',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/ayush.guidebookx@gmail.com.jpg',
      // description: 'Brief description about team member 2.',
    },
    {
      name: 'Rohan Dinesh Ghuge',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/rohan.guidebookx@gmail.com.jpg',
      // description: 'Brief description about team member 2.',
    },
    // Add more team members as needed
  ];

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>Welcome to GuidebookX. We are a dedicated team passionate about helping students achieve their dreams.</p>
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.imageUrl} alt={member.name} className="team-member-photo" />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
