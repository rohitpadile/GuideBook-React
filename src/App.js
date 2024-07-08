import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectCollegeComponent from './Components/SelectCollegeComponent';
import SelectStudentComponent from './Components/SelectStudentComponent';
import StudentProfileComponent from './Components/StudentProfileComponent';
import BookSessionComponent from './Components/BookSessionComponent';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SignupFormComponent from './Components/SignupFormComponent';
import ProfileComponent from './Components/ProfileComponent'
import HomePageComponent from './Components/HomePageComponent'; // Import the HomePage component
import ZoomSessionForm from './Components/ZoomSessionForm'; // Import the new ZoomSessionForm component
import { BranchProvider } from './Context/BranchContext';
import BlogListComponent from './Components/BlogListComponent';
import BlogPageComponent from './Components/BlogPageComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <BranchProvider>
          <Routes>
            <Route path="/" element={<HomePageComponent />} /> {/* Route for the Home page */}
            <Route path="/home" element={<HomePageComponent />} /> {/* Alternative route for the Home page */}
            <Route path="/colleges/:examName" element={<SelectCollegeComponent />} /> {/* Update path to include examName param */}
            <Route path="/selectStudent/:collegeName" element={<SelectStudentComponent />} />
            <Route path="/studentProfile" element={<StudentProfileComponent />} />
            <Route path="/bookSession" element={<BookSessionComponent />} />
            <Route path="/bookZoomSessionForm" element={<ZoomSessionForm />} /> {/* Add route for ZoomSessionForm */}
            {/* <Route path="/blogs/:studentId" element={<BlogListComponent />} />
            <Route path="/blogs/:studentId/:blogId" element={<BlogPageComponent />} /> */}
            <Route path="/signup" element={<SignupFormComponent/>} />
            <Route path="/profile" element={<ProfileComponent/>} />
            <Route path="/blogs/" element={<BlogListComponent />} />
            <Route path="/blogs/page" element={<BlogPageComponent />} />
          </Routes>
        </BranchProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
