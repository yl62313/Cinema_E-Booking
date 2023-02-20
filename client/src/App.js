import React from 'react';
import 'antd/dist/reset.css';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePage from './components/LandingPage/HomePage';
import DetailMoviePage from './components/MovieDetail/DetailMoviePage';
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MovieDetail from './components/MovieDetail/MovieDetail'
import Booking from './components/Booking/Booking';
import UploadMoviePage from './components/AdminView/UploadMoviePage';
import Admin from './components/AdminView/Admin';
import NavBar from './components/NavBar/NavBar';
import RegisterConfirm from './components/RegisterPage/RegisterConfirm';
import CheckoutPage from './components/Checkout/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage/OrderConfirmationPage';
import EditProfilePage from './components/EditProfilePage/EditProfilePage'
import OrderSummaryPage from './components/Booking/OrderSummaryPage/OrderSummaryPage';



function App() {
  return (

          <Router>
            <NavBar/>
              <div>
                  <Routes>
                      <Route exact path="/" element={<LandingPage/>}/>
                      <Route exact path="/home" element={<HomePage/>}/>
                      <Route exact path="/home/:movieId" element={<DetailMoviePage/>}/>
                      <Route exact path="/login" element={<LoginPage />}/>
                      <Route exact path="/login/editprofile" element={<EditProfilePage/>}/>
                      <Route exact path="/register" element={<RegisterPage/>}/>
                      <Route exact path="/register/confirm" element={<RegisterConfirm/>}/>
                      <Route exact path="/movie/:movieId" element={<MovieDetail/>}/>
                      <Route exact path="/booking" element={<Booking/>}/>
                      <Route exact path="/checkage" element={<OrderSummaryPage/>}/>
                      <Route exact path="/booking/checkout" element={<CheckoutPage/>}/>
                      <Route exact path="/admin/upload" element={<UploadMoviePage/>}/>
                      <Route exact path="/admin" element={<Admin/>}/>
                      <Route exact path="/booking/checkout/orderconfirm" element={<OrderConfirmationPage/>}/>

                  </Routes>
              </div>
          </Router>
  );
}

export default App; 
