import React from 'react'
import { useNavigate } from 'react-router-dom';
import tyIcon from "../../../samplePicture/thank-you-minions.jpg"


function OrderConfirmPage() {

  const show = JSON.parse(localStorage.getItem('show'));
  const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
  const totalPrice = localStorage.getItem('totalPrice')
  const transactionId = localStorage.getItem('transactionId');

  const navigate = useNavigate()

  return (
    <div className="flex justify-center h-screen items-center bg-checkout">
      <div className="card p-3 w-50">
      <h1 className="movieLetter mb-1 flex justify-center">Order Confirmation</h1>
      <div className='flex justify-center'>
      <div className="cardd p-3">
      <p className='cletterLetter'>Ticket information:</p>
      <br/>
      <ul>
        <li className='loginLetterd'>Movie: {show.movie.title}</li>
        <li className='loginLetterd'>Time: {show.time}</li>
        <li className='loginLetterd'>Selected seats: {selectedSeat.join(", ")}</li>
        <li className='loginLetterd'>Total price: ${totalPrice}</li>
        <li className='loginLetterd'>Confirmation code: {transactionId}</li>
      </ul>
      <div className="screenIcond cursor-pointer" onClick={()=>{navigate("/")}}>
        <img src={tyIcon} alt="" width={250}/>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default OrderConfirmPage