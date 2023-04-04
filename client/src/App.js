import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import ForgotPassword from "./Components/Pages/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/Pages/Login/ResetPassword/ResetPassword";
import Register from "./Components/Pages/Register/Register";
import RegisterConfirm from "./Components/Pages/RegisterConfirm/RegisterConfirm";
import DBMovieDetail from "./Components/Pages/Home/CommingSoon/DBMovieDetail";
import MovieDetail from "./Components/Pages/MovieDetail/MovieDetail";
import MoviePage from  "./Components/Pages/MoviePage/MoviePage";
import "./Style/basic.css"
import "./Style/custom.css"
import "./Style/form.css"
import "./Style/size.css"
import "./Style/theme.css"
import Admin from "./Components/Pages/Admin/Admin";
import AdminLogin from "./Components/Pages/Admin/AdminLogin";
import Profile from "./Components/Pages/Profile/Profile";
import SelectSeatPage from "./Components/Pages/SelectSeatPage";
import CheckoutPage from "./Components/Pages/CheckoutPage/CheckoutPage";
import OrderConfirmationPage from "./Components/Pages/OrderConfirmationPage/OrderConfirmationPage"
import Auth from "./Components/Pages/Auth/Auth";
import PromotionForm from "./Components/Pages/Admin/Promotion/PromotionForm";
import {useState} from "react"



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div>

      <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>}/>
              <Route path="/movie/:movieId" element={<DBMovieDetail/>}/>
              <Route path="/movie/moviePage" element={<MoviePage/>}/>
              <Route path="/movie" element={<MovieDetail/>}/>
              <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>}/>
              <Route path="/forgotPassword" element={<ForgotPassword/>}/>
              <Route path="/resetPassword" element={<ResetPassword/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/register/thankyou" element={<RegisterConfirm/>}/>
              <Route path="/Auth" element={<Auth/>}/>
              <Route path="/Admin" element={<Admin/>}/>
              <Route path="adminlogin" element={<AdminLogin/>}/>
              <Route path="/Profile" element={<Profile/>}/>
              <Route path="/movie/seat" element={<SelectSeatPage/>}/>
              <Route path="/movie/seat/checkout" element={<CheckoutPage/>}/>
              <Route path="/movie/seat/checkout/confirm" element={<OrderConfirmationPage/>}/>
              <Route path="/promotion" element={<PromotionForm/>}/>
            </Routes>
          </div>
      </BrowserRouter>
    
    </div>
  );
}

export default App;