
import SeatSample from "./SeatSample/SeatSample"
import OrderSummaryPage from "./SeatSample/OrderSummaryPage"

import Button from "../../Button"
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { Row,Col,Descriptions, Table } from "antd";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../reducers/loader_reducer';
import { BringMovieById } from '../../../action/movies';
import moment from "moment";
import MovieIcon from '../../../samplePicture/pngegg.png'



function SelectSeatPage() {

  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );
  const [movie, setMovie] = React.useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const getMovieList = async () => {
    try{
      dispatch(ShowLoading())
      const response = await BringMovieById(params.id);
      if(response.success){
        setMovie(response.data);
      }else{
        message.error(response.message);
      }
      dispatch(HideLoading());
    }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(()=>{
    getMovieList()
  },[]);


  return (

    <div>
      {/* show info */}
      <div className="flex justify-between card p-3">
        <div>
        <h1 className='text-2xl cursor-pointer uppercase' onClick={()=>{navigate("/")}}>
          <img src={MovieIcon} alt="" height={25}/> Title : {movie.title}
          </h1>
        </div>
      </div>


      {/* select seats sample bc seat have to bring data from db*/}
      <div>
        <div className="flex justify-center mt-2">
          <SeatSample/>
        </div>
        &nbsp;
        <div className="flex justify-center">
          <OrderSummaryPage/>
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