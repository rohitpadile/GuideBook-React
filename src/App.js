// import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import SelectCollegeComponent from './Components/SelectCollegeComponent';
import SelectStudentComponent from './Components/SelectStudentComponent';
import StudentProfileComponent from './Components/StudentProfileComponent';
import BookSessionComponent from './Components/BookSessionComponent';
import Header from './Components/Header';
import Footer from './Components/Footer';
// import SignupFormComponent from './Components/SignupFormComponent';
// import LoginFormComponent from './Components/LoginFormComponent';
// import ProfileComponent from './Components/ProfileComponent'
import HomePageComponent from './Components/HomePageComponent'; // Import the HomePage component
import ZoomSessionForm from './Components/ZoomSessionForm'; // Import the new ZoomSessionForm component
import { BranchProvider } from './Context/BranchContext';
import BlogListComponent from './Components/BlogListComponent';
import BlogPageComponent from './Components/BlogPageComponent';
import ScheduleZoomSession from './Components/ScheduleZoomSession';
// import { initializeProfile } from './Services/profileService';
// import CollegeClubListComponent from './Components/CollegeClubListComponent';
// import ClubPageComponent from './Components/ClubPageComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ZoomSessionFormSuccess from './Components/ZoomSessionFormSuccess';
import ZoomSessionFeedbackFormComponent from './Components/ZoomSessionFeedbackFormComponent';
import TermsAndConditions from './Components/TermsAndConditions';
import CancelZoomSessionComponent from './Components/CancelZoomSessionComponent';
import TRStudentApplicationForm from './Components/teamRecruiters/TRStudentApplicationForm';
import TRUpdateStudentApplicationForm from './Components/teamRecruiters/TRUpdateStudentApplicationForm';
import StudentProfileEditComponent from './Components/studentProfileEditRights/StudentProfileEditComponent';
// FOR TEAM RECRUITERS
// import TRStudentDetailsComponent from './Components/teamRecruiters/TRStudentDetailsComponent';
function App() {
  // useEffect(() => {
  //   initializeProfile(); //initializes the profile 
  // }, []);
  
  return (
    <Router>
      <Header />
      <div className="container">
        <BranchProvider>
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            <Route path="/home" element={<HomePageComponent />} />
            <Route path="/colleges/:examName" element={<SelectCollegeComponent />} />
            <Route path="/colleges" element={<SelectCollegeComponent />} />
            <Route path="/entrance-exams" element={<SelectCollegeComponent />} />
            <Route path="/selectStudent/:collegeName" element={<SelectStudentComponent />} />
            <Route path="/studentProfile" element={<StudentProfileComponent />} />
            <Route path="/bookSession" element={<BookSessionComponent />} />
            <Route path="/bookZoomSessionForm" element={<ZoomSessionForm />} />
            <Route path="/zoomSessionFormSuccess" element={<ZoomSessionFormSuccess/>} />
            <Route path="/cancel-zoom-session/:encryptedformId" element={<CancelZoomSessionComponent />} />
            <Route path="/blogs" element={<BlogListComponent />} />
            <Route path="/blogs/page" element={<BlogPageComponent />} />
            <Route path="/termsAndConditions" element={<TermsAndConditions />} />
              
            <Route path="/schedule-zoom-session/:encryptedFormIdAndStudentWorkEmail" element={<ScheduleZoomSession />} />
            <Route path="/feedback-zoom-session/:encryptedTransactionId" element={<ZoomSessionFeedbackFormComponent />} />
            {/* <Route path="/helpDesk" component={HelpDesk} />
            <Route path="/feedback" component={Feedback} /> */}
            {/* ROUTES FOR TEAM RECRUITERS */}
            <Route path="/TRStudentApplicationForm" element={<TRStudentApplicationForm />} />
            <Route path="/TRUpdateStudentApplicationForm" element={<TRUpdateStudentApplicationForm />} />
            <Route path="/StudentProfileEdit/:encryptedStudentWorkEmail" element={<StudentProfileEditComponent />} />
          </Routes>
        </BranchProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

