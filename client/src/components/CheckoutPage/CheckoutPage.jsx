import React, {useEffect, useState} from 'react';
import { Link, useHistory} from 'react-router-dom';

import './CheckoutPage.css';

function CheckoutPage() {

  return(

    <div className="body">
    <div className="checkoutPageTitle">
    <h1>Checkout</h1>
    </div>


    <div className="box"> 
    <form className="checkoutContainer">   
      <div className="personalInformation">
          <h4>Personal Information</h4>
          <label>First Name
          <input type="text"
           id="firstName"/>
          </label>
          <label>Last Name</label>
          <input type="text" id="lastName"/>
          <label>Email Address</label>
          <input type="email" id="email"/>
          <label>Phone Number</label>
          <input type="tel" id="phoneNumber"/>
          

            <h4>Home Address</h4>
            <label>Street </label>
            <input type="text" id="street"/>
            <label>City</label>
            <input type="text" id="city"/>
            <label> State</label>
            <input type="text" id="state"/>
            <label>Zip Code</label>
            <input type="text" id="zipCode"/>
        </div>

          <div className="paymentInformation">
              <h4>Payment Information</h4>
              <h5>Card Type:</h5>
                  <div className="paymentRadios">
                  <label>Credit
                  <input type="radio" id="credit" name="paymentsGroup" value="credit"/>
                  </label>
                  <label>Debit
                  <input type="radio" id="debit" name="paymentsGroup" value="debit"/>
                  </label>
                  <label>Gift Card
                  <input type="radio" id="giftCard" name="paymentsGroup" value="giftCard"/>
                  </label>
                  </div>
                  <br></br>
              <label>Card Number</label>
              <input type="text" id="cardNumber" placeholder='####-####-####-####'/>
              <label> Expiration Date</label>
              <input type="date" id="state"/>

              <br></br>
              <h4>Billing Address</h4>
              <label>Street </label>
              <input type="text" id="street"/>
              <label>City</label>
              <input type="text" id="city"/>
              <label> State</label>
              <input type="text" id="state"/>
              <label>Zip Code</label>
              <input type="text" id="zipCode"/>
          </div>

          <div className="checkoutButtons">
            <input type="button" value="Cancel" id="cancelButton"></input>
            <input type="button" value="Confirm" id="confirmButton"></input>
          </div>

    </form>
    </div> 
    </div>

  )

}

export default CheckoutPage;
