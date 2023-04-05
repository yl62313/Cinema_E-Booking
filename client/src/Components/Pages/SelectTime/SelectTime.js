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


function SelectTime() {
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
  


return movie && (
<div>
  {/*movie info*/}
  <div className='flex justify-between'>
      <div>
          <h1 className='text-3xl'>
              Title : {movie.title}
          </h1>
      </div>
      {/*Choose Date*/}
      <div>
          <h1 className='text-md'>
              Select Date: 
          </h1>
          <input type = 'date'
          min={moment().format("YYYY-MM-DD")}
          value={date}
          onChange={(e) => {
              setDate(e.target.value);
              navigate(`/movie/${params.id}?date=${e.target.value}`);
            }}
          />
      </div>
  </div>
  <br/>

  <hr/>
  <div>
      <h1 className='text-3xl'>Times</h1>
  </div>

  {/* Time with data base, now is just sample */}
  <div className='flex flex-col gap-1'>
      <div className='card p-3'>

          <div className='flex gap-2 cursor-pointer'>
              <div className='card p-1'
              onClick={()=> navigate(`/movies/seat/${movie._id}`)}>
                  <h1 className='text-sm'>11:00am</h1>
              </div>
              <div className='card p-1'
              onClick={()=> navigate(`/movies/seat/${movie._id}`)}>
                  <h1 className='text-sm'>12:00am</h1>
              </div>
              <div className='card p-1'
              onClick={()=> navigate(`/movies/seat/${movie._id}`)}>
                  <h1 className='text-sm'>1:00pm</h1>
              </div>
          </div>
      </div>
  </div>
  </div>

)
}

export default SelectTime