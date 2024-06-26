import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectCollegeComponent from './Components/SelectCollegeComponent';
import './App.css';

function App() {
  return (
    <div>
      <Router>
          {/* <HeaderComponent/> */}
              <div className="container">
                <Routes>  
                  <Route path="/" element={<SelectCollegeComponent />} />
                  <Route path="/colleges" element={<SelectCollegeComponent />} />
                </Routes>
              </div>
          {/* <FooterComponent/> */}
      </Router>
    </div>
  );
}

export default App;
