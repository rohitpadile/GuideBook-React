import React from 'react';
import '../css/AboutUsCss.css'; // Create and import your CSS file

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Your Name',
      role: 'Founder & CEO',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/your-photo.jpg',
      description: 'Brief description about you.',
    },
    {
      name: 'Team Member 1',
      role: 'CTO',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/member1-photo.jpg',
      description: 'Brief description about team member 1.',
    },
    {
      name: 'Team Member 2',
      role: 'Lead Developer',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/member2-photo.jpg',
      description: 'Brief description about team member 2.',
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
