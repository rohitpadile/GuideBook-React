import React from 'react';
import '../css/AboutUsCss.css'; // Create and import your CSS file

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Rohit Padile',
      role: 'Founder & CEO',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/rohitp22.elec@coeptech.ac.in.jpg',
    },
    {
      name: 'Bhavesh Manoj Kapure',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/bhavesh.guidebookx@gmail.com.jpg',
    },
    {
      name: 'Chetan Pathade',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/chetan.guidebookx@gmail.com.jpg',
    },
    {
      name: 'Vishwambhar Laxmikant Joshi',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/vishwambhar.guidebookx@gmail.com.jpg',
    },
    {
      name: 'Ajay Sayanna Karhade',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/personicon.jpg',
    },
    {
      name: 'Ayush Shailesh Agrawal',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/ayush.guidebookx@gmail.com.jpg',
    },
    {
      name: 'Rohan Dinesh Ghuge',
      role: 'Operations',
      imageUrl: 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/team/rohan.guidebookx@gmail.com.jpg',
    },
  ];

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to GuidebookX, a platform created by students for students. At GuidebookX, our mission is to connect students from prestigious engineering colleges with aspiring students who are preparing for entrance exams or seeking academic guidance. Through 1:1 Zoom sessions, our experienced student mentors provide valuable insights, tips, and strategies tailored to the unique needs of each client.
      </p>
      <p>
        Clients can filter mentors by their college, branch, entrance scores, grades, and more, ensuring they find the right mentor for their specific needs. Whether it's guidance on entrance exams, study strategies, or navigating the complexities of academic life, GuidebookX aims to provide access to the right tools and support for students across India.
      </p>
      <p>
        This platform was born out of a personal desire to solve a critical issue in our education system: the lack of access to proper guidance and resources for many students. We believe that every student deserves the right direction, and through GuidebookX, we hope to democratize access to quality education and mentorship.
      </p>
      <p>
        Join us at GuidebookX and let us help you achieve your academic goals. Feel free to register on our website or reach out with any questions at <a href="mailto:helpguidebookx@gmail.com">helpguidebookx@gmail.com</a>.
      </p>
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.imageUrl} alt={member.name} className="team-member-photo" />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            {/* <p>{member.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
