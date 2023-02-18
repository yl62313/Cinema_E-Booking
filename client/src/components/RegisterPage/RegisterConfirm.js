import React from 'react'
import Auth from '../../hoc/auth'
import './RegisterConfirm.css'
import DoneIcon from '@mui/icons-material/Done';
function RegisterConfirm() {
  return (
    <div className="register-confirm">
      <DoneIcon sx={{ fontSize: 50 }}/>
      <div class="textBox">
      <h2> That's all, thank you! </h2>
      </div>
      <a href="http://localhost:3001/login">Log In Now!</a>

    </div>
  )
}

export default Auth(RegisterConfirm, null)