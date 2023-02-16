import React from 'react';
import 'antd/dist/reset.css';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';


function App() {
  return (

          <Router>
              <div>
                  <Routes>
                      <Route exact path="/" element={<LandingPage/>}/>
                      <Route exact path="/login" element={<LoginPage />}/>
                      <Route exact path="/register" element={<RegisterPage/>}/>
                  </Routes>
              </div>
          </Router>
  );
}

export default App; 
