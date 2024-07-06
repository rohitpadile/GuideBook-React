import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectCollegeComponent from './Components/SelectCollegeComponent';
import SelectStudentComponent from './Components/SelectStudentComponent';
import StudentProfileComponent from './Components/StudentProfileComponent';
import BookSessionComponent from './Components/BookSessionComponent';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SecondaryNavbarComponent from './Components/SecondaryNavbarComponent'; // Import the updated SecondaryNavbarComponent
import { BranchProvider } from './Context/BranchContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      {/* <SecondaryNavbarComponent /> Include the updated SecondaryNavbarComponent */}
      <div className="container">
        <BranchProvider>
          <Routes>
            <Route path="/colleges/:examName" element={<SelectCollegeComponent />} /> {/* Update path to include examName param */}
            <Route path="/selectStudent/:collegeName" element={<SelectStudentComponent />} />
            <Route path="/studentProfile" element={<StudentProfileComponent />} />
            <Route path="/bookSession" element={<BookSessionComponent />} />
          </Routes>
        </BranchProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
