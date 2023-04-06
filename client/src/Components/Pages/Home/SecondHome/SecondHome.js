import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import {useNavigate} from "react-router-dom"
import { Row,Col,Select } from "antd";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import {BringMovieList} from '../../../../action/movies'
import moment from "moment";
import axios from 'axios'

const { Option } = Select;


function SecondHome() {
  const [movies, setMovies] = React.useState([]);
  const [searchMovie, setSearchMovie] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("Title");
  const [errorMsg, setErrorMsg] = React.useState("");
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

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      dispatch(ShowLoading());
      const searchParams = {
        filter: selectedFilter.toLowerCase(),
        [selectedFilter.toLowerCase()]: searchMovie,
      };
      const response = await axios.get("/api/movies", {
        params: searchParams,
      });
      if (response.data.error) {
        setErrorMsg(response.data.message);
        setMovies([]);
      } else {
        if (response.data.movies.length === 0) {
          setErrorMsg("No Search Results Found");
          setMovies([]);
        } else {
          setErrorMsg("");
          setMovies(response.data.movies);
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  useEffect(() => {
    getMovieList();
  }, []);
  
  return (
    <div>
      <div className="flex justify-end gap-1">
        <div>
        <Select
          defaultValue="Title"
          style={{ width: 120 }}
          onChange={(value) => setSelectedFilter(value)}
        >
          <Option value="Title">Title</Option>
          <Option value="Genre">Genre</Option>
          <Option value="Rating">Rating</Option>
        </Select>
        {/* Search movie */}
        </div>
        <div>
        <input
          type="text"
          className="searchbar"
          placeholder="Search"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button className='searchIcon cursor-pointer' onClick={handleSearch}><SearchOutlined /></button>
        </div>
      </div>
  
      {errorMsg && (
        <div className="flex justify-center">
          <p>{errorMsg}</p>
        </div>
      )}

      <Row gutter={[16, 16]} className="mt-2">
        {movies.map((movie) => (
          <Col span={6}>
            <div
              className="card flex flex-col gap-1 cursor-pointer"
              onClick={() =>
                navigate(
                  `/movies/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
            >
              <img src={movie.poster} alt="" height={200} />
              <div className="flex justify-center gap-1 p-2">
              <h1 className="text-sm uppercase">{movie.title}</h1>
              </div>
            </div>
          </Col>
        ))}
        <div></div>
      </Row>
    </div>
  );
  
}

export default SecondHome
