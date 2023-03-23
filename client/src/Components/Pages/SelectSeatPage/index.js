import React from "react"
import SeatSample from "./SeatSample/SeatSample"
import OrderSummaryPage from "./SeatSample/OrderSummaryPage"
import Button from "../../../Components/Button"
import {useNavigate} from "react-router-dom"


function SelectSeatPage() {
  const navigate = useNavigate()
  const onToken = (token) => {
    console.log(token)
  }




  return (

    <div>
      {/* show info */}
      <div className="flex justify-between card p-3">
        <div>
          <h1 className="text-xl uppercase">minion1</h1>
        </div>
        <div>
          <h1 className="text-sm">
            Dec 25th 2022 - {''}
            12:00
          </h1>
        </div>
      </div>


      {/* select seats sample bc seat have to bring data from db*/}
      <div>
        <div className="flex justify-center">
          <OrderSummaryPage/>
        </div>
        <div className="flex justify-center mt-2">
          <SeatSample/>
        </div>
      </div>

      <div className='mt-2 flex justify-center'>
      {/*
      we have 2 options of payment
      payment API: https://dashboard.stripe.com/test/apikeys
      <StripeCheckout
       token={onToken}
        stripeKey="pk_test_51MdOpDFHa2R7jcYkKQZE4zdNY58M9ZIOQkonNTSiQe22FVy39gVkiZcAfcDlQmkpXfCKHgodiGh6ZP4DPfbm54Vg00lVhHz3KL">  
        <Button title='Book Now'/>
      </StripeCheckout>*/}
      <div onClick={()=> navigate(`/movie/seat/checkout`)}>
      <Button title='Book Now'/>
      </div>

      <div onClick={()=> navigate(`/`)}>
        <Button title='Cancel'/>
      </div>
      </div>


    </div>
    )
}

export default SelectSeatPage