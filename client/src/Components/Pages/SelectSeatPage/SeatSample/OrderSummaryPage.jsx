import React from 'react';

import './OrderSummaryPage.css';

const OrderSummaryPage = ({childTickets,adultickets, seniorTickets, childPrice, adultPrice, seniorPrice, totalPrice}) => {
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
          <div>{childTickets || '0'}</div>
          <button>+</button>
          </div>

        <div className="quantity-button">
          <button>-</button>
          <div>{adultickets || '0'}</div>
          <button>+</button>
          </div>

           <div className="quantity-button">
          <button>-</button>
          <div>{seniorTickets || '0'}</div>
          <button>+</button>
          </div>

        </div>  

        <div className="price-col">
          <h3>Price:</h3>
          <div>{childPrice || '$0.00'}</div>
          <div>{adultPrice || '$0.00'}</div>
          <div>{seniorPrice || '$0.00'}</div>
        </div>

        <h3>order total: {totalPrice || '$0.00'}</h3>
        </div>
    </div>
  )
}

export default OrderSummaryPage;