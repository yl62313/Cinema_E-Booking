import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { Row,Col,Descriptions, Table } from "antd";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { BringMovieById } from '../../../../action/movies';
import moment from "moment";
import Button from '../../../Button'
import MovieIcon from '../../../../samplePicture/pngegg.png'


function MoviePage() {
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
       <div className='flex justify-between'>
       <div>
     
          <h1 className='text-2xl cursor-pointer uppercase' onClick={()=>{navigate("/")}}>
          <img src={MovieIcon} alt="" height={25}/> Title : {movie.title}
          </h1>
      </div>
       <div>
       <h1 className="text-md">Select Date</h1>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movies/${params.id}?date=${e.target.value}`);
              }}
            />
      </div>
      </div>
      <div className='mt-3 mb-3'>          
      <Descriptions title= "" bordered>
        <Descriptions.Item className='uppercase' label="Title"> {movie.title} </Descriptions.Item>
        <Descriptions.Item label="CATEGORY"> {movie.genre} </Descriptions.Item>
        <Descriptions.Item label="CAST">{movie.cast} </Descriptions.Item>
        <Descriptions.Item label="DIRECTOR"> {movie.director}</Descriptions.Item>
        <Descriptions.Item label="PRODUCER" span={2}> {movie.producer}</Descriptions.Item>
        <Descriptions.Item label="SYNOPSIS"> {movie.synopsis}</Descriptions.Item>
        <Descriptions.Item label="REVIEW" span={2}>{movie.review} </Descriptions.Item>
        <Descriptions.Item label="POSTER" span={2}><img src={movie.poster} alt="" width={200} height={250}/> </Descriptions.Item>
        <Descriptions.Item label="TRAILER" span={2}>
          <iframe width="300" height="250" src= {movie.trailer} frameborder="0"/>
        </Descriptions.Item>
      </Descriptions>
      </div>

      <div className="flex justify-center">
        <div>
      <Button fullWidth title="BOOK MOVIE" type="submit" onClick={()=> navigate(`/movies/seat/${movie._id}`)} />
        </div>
      </div>
    </div>
      )
}

export default MoviePage
