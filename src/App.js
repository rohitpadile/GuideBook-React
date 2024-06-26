import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectCollegeComponent from '//Components/SelectCollegeComponent';
// import SelectStudentComponent from './Components/SelectStudentComponent';
import { BranchProvider } from '//Context/BranchContext';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <BranchProvider>
          <div className="container">
            <Routes>
              <Route path="/colleges" element={<SelectCollegeComponent />} />
              {/* <Route path="/select-student/:collegeId" element={<SelectStudentComponent />} /> */}
            </Routes>
          </div>
        </BranchProvider>
      </Router>
    </div>
  );
}

export default App;
