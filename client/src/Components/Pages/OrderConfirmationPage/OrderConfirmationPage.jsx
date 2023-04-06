import Button from '../../Button';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './OrderConfirmationPage.css'


const OrderConfirmationPage = ({userName, email, movieTitle, selectedTime, selectedSeat, numOfTickets, totalPrice}) => {

  const orderNumber = Math.floor(Math.random() * 1000000);
  const navigate = useNavigate();

  function currencyFormat(num) {
    return"$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  return (
    <div className="flex justify-center h-screen items-center bg-primary"> 
        <div className="card p-3 w-800" >
        <h1>Thank you for your order!</h1>
      <h2>Order number is: {orderNumber}</h2>
        <h3>A confirmation has been sent to your email: {email || 'defaultemail@uga.edu'}</h3>
        <h3>Movie: {movieTitle || 'Your Movie'}</h3>
        <h3>Time: {selectedTime || '12:00pm'}</h3>
        <h3>Seat(s): {selectedSeat || 'G7'}</h3>
        <h3>Ticket Quantity: {numOfTickets || '1'}</h3>
        <h3>Total Price: {totalPrice || '$5.00'}</h3>
        <br/>
        <div onClick={()=> navigate(`/`)}>
            <Button title='Back to home' type='button' ></Button>
            {/* <input type="button" value="Cancel" id="cancelButton"></input> */}
            </div>
        </div>
    </div>
  )
}

export default OrderConfirmationPage;