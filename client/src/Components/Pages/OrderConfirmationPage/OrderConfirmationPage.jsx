import React from 'react'

import './OrderConfirmationPage.css'

const OrderConfirmationPage = ({orderNumber,userName, email, movieTitle, selectedTime, selectedSeat, numOfTickets, totalPrice}) => {
  return (
    <div>
      <h1>Thank you {userName || 'defaultUser'} for your order!</h1>
      <h2>Order number is: {orderNumber || '123456'}</h2>
        <div className="movie-details">
        <h4>A confirmation has been sent to your email: {email || 'defaultemail@uga.edu'}</h4>
        <h4>Movie: {movieTitle || 'Your Movie'}</h4>
        <h4>Time: {selectedTime || '12:00pm'}</h4>
        <h4>Seat(s): {selectedSeat || 'G7'}</h4>
        <h4>Ticket Quantity: {numOfTickets || '1'}</h4>
        <h4>Total Price: {totalPrice || '$5.00'}</h4>
        </div>
    </div>

  )
}

export default OrderConfirmationPage;