import React from 'react';
import { Link } from 'react-router-dom';


import './OrderSummaryPage.css';

const OrderSummaryPage = () => {
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
          <button>-</button>
          <div>0</div>
          <button>+</button>
          </div>

        <div className="quantity-button">
          <button>-</button>
          <div>0</div>
          <button>+</button>
          </div>

           <div className="quantity-button">
          <button>-</button>
          <div>0</div>
          <button>+</button>
          </div>

        </div>  

        <div className="price-col">
          <h3>Price:</h3>
          <div>$0.00</div>
          <div>$0.00</div>
          <div>$0.00</div>
        </div>

        <h3>order total: $0.00</h3>
        </div>

        <button>cancel order</button>
        <button>checkout</button>

    </div>
  )
}

export default OrderSummaryPage;