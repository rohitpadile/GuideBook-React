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
import CompanyFeedbackFormComponent from './Components/CompanyFeedbackFormComponent';
import HelpdeskComponent from './Components/HelpdeskComponent'
import AboutUs from './Components/AboutUs'
import auth from './auth';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ProfileAccount from './Components/profileAccount/ProfileAccount';
import SubscriptionComponent from './Components/profileAccount/SubscriptionComponent';
import PrivacyPolicy from './Components/company/PrivacyPolicy';
import CancellationRefundPolicy from './Components/company/CancellationRefundPolicy';
import PaymentPageComponentZoomSession from './Components/profileAccount/PaymentPageComponentZoomSession.jsx';
import ForgotPassword from './Components/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword.jsx';
import ShippingAndDelivery from './Components/company/ShippingAndDelivery.jsx';
import TopicDiscussionPage from './coeptech/Components/TopicDiscussionPage.jsx';
// FOR TEAM RECRUITERS
// import TRStudentDetailsComponent from './Components/teamRecruiters/TRStudentDetailsComponent';
function App() {
  
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
            <Route path="/feedback" element={<CompanyFeedbackFormComponent />} />
            <Route path="/helpdesk" element={<HelpdeskComponent />} />
            {/* ROUTES FOR TEAM RECRUITERS */}
            <Route path="/TRStudentApplicationForm" element={<TRStudentApplicationForm />} />
            <Route path="/TRUpdateStudentApplicationForm" element={<TRUpdateStudentApplicationForm />} />
            <Route path="/StudentProfileEdit" element={<StudentProfileEditComponent />} />
            <Route path="/aboutUs" element={<AboutUs />} />

            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/home" element={isLoggedIn() ? <Home /> : <Navigate to="/login" />} /> */}
            <Route path="/profile" element={<ProfileAccount />} />
            {/* SubscriptionComponent */}
            <Route path="/subscription" element={<SubscriptionComponent />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/cancellationRefundPolicy" element={<CancellationRefundPolicy />} />
            <Route path="/confirmZoomSession/:transactionId" element={<PaymentPageComponentZoomSession />} />
            
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/shippingAndDeliveryPolicy" element={<ShippingAndDelivery />} />
            {/* COEP TECH */}

            <Route path="/coeptech/discussions/:topicname" element={<TopicDiscussionPage />} />
          </Routes>
        </BranchProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

