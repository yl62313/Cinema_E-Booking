import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useParams,useNavigate } from "react-router-dom"
import { message } from 'antd';
import { BringMovieList } from '../../../../action/movies';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import moment from 'moment';
import { Descriptions } from 'antd'
import Button from '../../../Button';


function MoviePage() {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const getMovieList = async () => {
    try{
      dispatch(ShowLoading())
      const response = await BringMovieList(params.id);
      if(response.success){
        setMovies(response.data);
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
      movies && (
    <div>
       <div className='flex justify-between'>
       <div>
          <h1 className='text-3xl'>
              Title : {movies.title}
          </h1>
        </div>
       <div>
          <h1 className='text-md'>
              Select Date: 
          </h1>
          <input type = 'date'
          min={moment().format("YYYY-MM-DD")}
          />
      </div>
      </div>
      <div>          

<Descriptions title=  {movies.title} bordered>
    <Descriptions.Item label="Title">  </Descriptions.Item>
    <Descriptions.Item label="Category"> {movies.genre} </Descriptions.Item>
    <Descriptions.Item label="Cast"> </Descriptions.Item>
    <Descriptions.Item label="Director"> </Descriptions.Item>
    <Descriptions.Item label="Producer" span={2}> </Descriptions.Item>
    <Descriptions.Item label="Synopsis"> </Descriptions.Item>
    <Descriptions.Item label="Review" span={2}> </Descriptions.Item>
    <Descriptions.Item label="Post"> </Descriptions.Item>
    <Descriptions.Item label="Video"> <iframe/> </Descriptions.Item>
</Descriptions>
</div>

      <div className="flex justify-center">
        <div>
      <Button fullWidth title="BOOK MOVIE" type="submit" onClick={()=> navigate(`/movies/seat/${movies._id}`)} />
        </div>
      </div>
    </div>
      )
    )
}

export default MoviePage
