import React from 'react';

import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Button from '../../../Button';

import './OrderSummaryPage.css';

const OrderSummaryPage = () => {
 
  const navigate = useNavigate()

const [childTickets, setChildTickets] = useState(0);
var [childPrice, setChildPrice] = useState(0.00);
const [adultTickets, setAdultTickets] = useState(0);
var [adultPrice, setAdultPrice] = useState(0.00);
const [seniorTickets, setSeniorTickets] = useState(0);
var [seniorPrice, setSeniorPrice] = useState(0.00);
// var [totalPrice, setTotalPrice] = useState(0.00);

const incrementChildTickets = () => {
    setChildTickets(childTickets+1);
    setChildPrice(currencyFormat((childTickets+1)*2));
    // setTotalPrice();
    // setTotalPrice(currencyFormat(totalPrice+childPrice));
}

const decrementChildTickets = () => {
  setChildTickets(childTickets-1);
  setChildPrice(currencyFormat((childTickets-1)*2));
  // setTotalPrice();
  // setTotalPrice(currencyFormat(totalPrice-childPrice));
}

const incrementAdultTickets = () => {
  setAdultTickets(adultTickets+1);
  setAdultPrice(currencyFormat((adultTickets+1)*6));
  // setTotalPrice();
//  setTotalPrice(currencyFormat(totalPrice+adultPrice));
}

const decrementAdultTickets = () => {
setAdultTickets(adultTickets-1);
setAdultPrice(currencyFormat((adultTickets-1)*6));
// setTotalPrice();
// setTotalPrice(currencyFormat(totalPrice-adultPrice));
}

const incrementSeniorTickets = () => {
  setSeniorTickets(seniorTickets+1);
  setSeniorPrice(currencyFormat((seniorTickets+1)*4));
  // setTotalPrice();
  // setTotalPrice(currencyFormat(totalPrice+seniorPrice));
}

const decrementSeniorTickets = () => {
setSeniorTickets(seniorTickets-1);
setSeniorPrice(currencyFormat((seniorTickets-1)*4));
// setTotalPrice();
// setTotalPrice(currencyFormat(totalPrice-seniorPrice));
}

// function setTotalPrice() {
//   totalPrice = childPrice + adultPrice + seniorPrice;
//  return currencyFormat(totalPrice);
// }

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Ticket Details</h2>

      <div className ="summaryContainer">
      <div className="ticket-type-col">
      <h3>Ticket Type:</h3>
          <div>Child:</div>
          <div>Adult:</div>
          <div>Senior:</div>
      </div>

      <div className="quantity-col">
          <h3>Quantity:</h3>

          <div className="quantity-button">
          <button onClick={decrementChildTickets}>-</button>
          <div>{childTickets || '0'}</div>
          <button onClick={incrementChildTickets}>+</button>
          </div>

        <div className="quantity-button">
          <button onClick={decrementAdultTickets}>-</button>
          <div>{adultTickets || '0'}</div>
          <button onClick={incrementAdultTickets}>+</button>
          </div>

           <div className="quantity-button">
          <button onClick={decrementSeniorTickets}>-</button>
          <div>{seniorTickets || '0'}</div>
          <button onClick={incrementSeniorTickets}>+</button>
          </div>

        </div>  

        <div className="price-col">
          <h3>Price:</h3>
          <div>{childPrice || '$0.00'}</div>
          <div>{adultPrice || '$0.00'}</div>
          <div>{seniorPrice || '$0.00'}</div>
        </div>

        {/* <h3>order subtotal: {totalPrice || '$0.00'}</h3> */}
        </div>

      

    </div>
  )
}

export default OrderSummaryPage;