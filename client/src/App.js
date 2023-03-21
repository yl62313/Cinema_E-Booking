import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import ForgotPassword from "./Components/Pages/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/Pages/Login/ResetPassword/ResetPassword";
import Register from "./Components/Pages/Register/Register";
import RegisterConfirm from "./Components/Pages/RegisterConfirm/RegisterConfirm";
import DBMovieDetail from "./Components/Pages/Home/CommingSoon/DBMovieDetail";
import MovieDetail from "./Components/Pages/MovieDetail/MovieDetail";
import "./Style/basic.css"
import "./Style/custom.css"
import "./Style/form.css"
import "./Style/size.css"
import "./Style/theme.css"


function App() {
  return (
    <div>

      <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/movie/:movieId" element={<DBMovieDetail/>}/>
              <Route path="/movie" element={<MovieDetail/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgotPassword" element={<ForgotPassword/>}/>
              <Route path="/resetPassword" element={<ResetPassword/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/register/thankyou" element={<RegisterConfirm/>}/>
            </Routes>
          </div>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
