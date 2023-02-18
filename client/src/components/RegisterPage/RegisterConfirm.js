import React from 'react'
import Auth from '../../hoc/auth'
import './RegisterConfirm.css'

function RegisterConfirm() {
  return (
    <div className="register-confirm">

        <h1> Thank you </h1>

    </div>
  )
}

export default Auth(RegisterConfirm, null)