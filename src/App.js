
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectCollegeComponent from './Components/SelectCollegeComponent';
import SelectStudentComponent from './Components/SelectStudentComponent';
import StudentProfileComponent from './Components/StudentProfileComponent';
import BookSessionComponent from './Components/BookSessionComponent';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SignupFormComponent from './Components/SignupFormComponent';
import LoginFormComponent from './Components/LoginFormComponent';
import ProfileComponent from './Components/ProfileComponent'
import HomePageComponent from './Components/HomePageComponent'; // Import the HomePage component
import ZoomSessionForm from './Components/ZoomSessionForm'; // Import the new ZoomSessionForm component
import { BranchProvider } from './Context/BranchContext';
import BlogListComponent from './Components/BlogListComponent';
import BlogPageComponent from './Components/BlogPageComponent';
import { initializeProfile } from './Services/profileService';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition } from 'react-transition-group';
import SelectCollegeForClubsComponent from './Components/SelectCollegeForClubsComponent';
function App() {
  useEffect(() => {
    initializeProfile(); //initializes the profile 
  }, []);

  return (
    <Router>
      <Header />
      <div className="container">
        <BranchProvider>
          <Routes>
            <Route
              path="/"
              element={
                <CSSTransition classNames="page" timeout={300} appear>
                  <HomePageComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/home"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <HomePageComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/colleges/:examName"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <SelectCollegeComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/selectStudent/:collegeName"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <SelectStudentComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/studentProfile"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <StudentProfileComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/bookSession"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <BookSessionComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/bookZoomSessionForm/:studentName"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <ZoomSessionForm />
                </CSSTransition>
              }
            />
            <Route
              path="/signup"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <SignupFormComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/login"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <LoginFormComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <ProfileComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/blogs"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <BlogListComponent />
                </CSSTransition>
              }
            />
            <Route
              path="/blogs/page"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <BlogPageComponent />
                </CSSTransition>
              }
            />

            <Route
              path="/clubs"
              element={
                <CSSTransition classNames="page" timeout={300}>
                  <SelectCollegeForClubsComponent />
                </CSSTransition>
              }
            />
          </Routes>
        </BranchProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
