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
import MovieDetail from './components/MovieDetail/MovieDetail'
import Booking from './components/Booking/Booking';
import UploadMoviePage from './components/AdminView/UploadMoviePage';
import NavBar from './components/NavBar/NavBar';
import RegisterConfirm from './components/RegisterPage/RegisterConfirm';
import CheckoutPage from './components/Checkout/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage/OrderConfirmationPage';

function App() {
  return (

          <Router>
            <NavBar/>
              <div>
                  <Routes>
                      <Route exact path="/" element={<LandingPage/>}/>
                      <Route exact path="/login" element={<LoginPage />}/>
                      <Route exact path="/register" element={<RegisterPage/>}/>
                      <Route exact path="/register/confirm" element={<RegisterConfirm/>}/>
                      <Route exact path="/movie/:movieId" element={<MovieDetail/>}/>
                      <Route exact path="/booking" element={<Booking/>}/>
                      <Route exact path="/booking/checkout" element={<CheckoutPage/>}/>
                      <Route exact path="/movie/upload" element={<UploadMoviePage/>}/>
                      <Route exact path="/orderconfirm" element={<OrderConfirmationPage/>}/>

                  </Routes>
              </div>
          </Router>
  );
}

export default App; 
