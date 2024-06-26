import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SelectCollege from '.Functional-Components/SelectCollege';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Our Service</h1>
      </header>
      <Router>
        <div>
          <Switch>
            <Route path="/select-college" component={SelectCollege} />
            {/* Add more routes here as needed */}
            <Route path="/" exact>
              <h2>Homepage</h2>
              {/* Add content for the homepage */}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
