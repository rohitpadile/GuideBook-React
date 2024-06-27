import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectCollegeComponent from './Components/SelectCollegeComponent'; // Corrected path
import SelectStudentComponent from './Components/SelectStudentComponent';
import { BranchProvider } from './Context/BranchContext'; // Corrected path
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <Router>
        <BranchProvider>
          <div className="container">
            <Routes>
              <Route path="/colleges" element={<SelectCollegeComponent />} />
              <Route path="/selectStudent/:collegeId" element={<SelectStudentComponent />} />
            </Routes>
          </div>
        </BranchProvider>
      </Router>
    </div>
  );
}

export default App;
