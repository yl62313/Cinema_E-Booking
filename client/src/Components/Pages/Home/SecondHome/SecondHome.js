import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { Row,Col } from "antd";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import {BringMovieList} from '../../../../action/movies'




function SecondHome() {
  const [movies, setMovies] = React.useState([]);
  const [searchMovie = "", setSearchMovie] = React.useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getMovieList = async () => {
    try{
      dispatch(ShowLoading())
      const response = await BringMovieList();
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
    <div>
      <div className='flex justify-end'>
      {/*Search movie */}
      <input 
      type="text"
      className="searchbar"
      placeholder="Search"
      value={searchMovie}
      onChange={(e)=>setSearchMovie(e.target.value)}
      />
      </div>

      <Row gutter={[16,16]} className="mt-2">
        {movies.filter((movie)=> movie.title.includes(searchMovie)).map((movie)=>(
        <Col span={6}>
          <div className='card flex flex-col gap-1 cursor-pointer'
          onClick={()=> navigate(`/movies/moviePage`)}
          >
            <img src={movie.poster} alt="" height={200}/>
            <div className='flex justify-center gap-1 p-2'>
            <h1 className="text-md uppercase">
              {movie.title}
            </h1>
            </div>
          </div>
        </Col>
        ))}
      </Row>
    </div>
  )
}

export default SecondHome