import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Descriptions, Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { BringMovieById } from '../../../../action/movies';
import moment from "moment";
import MovieIcon from '../../../../samplePicture/pngegg.png'
import { GetAllShows } from '../../../../action/movies';
import Button from '../../../Button';

function MoviePage({isLoggedIn}) {
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );
  const [movie, setMovie] = React.useState([]);
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const getMovieList = async () => {
    try {
      dispatch(ShowLoading())
      const response = await BringMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
  
      const showResponse = await GetAllShows({
        movieId: response.data._id, // <--- use `response.data._id` instead of `movie._id`
      })
      if (showResponse.success) {
        setShows(showResponse.data);
      } else {
        message.error(showResponse.message)
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  




  useEffect(() => {
    getMovieList()
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(text).format("MMM Do YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button
          fullWidth
          title="BOOK MOVIE"
          type="submit"
          onClick={() => navigate(`/movies/seat/${movie._id}`)}
        />
      ),
    },
  ];

  return movie && (
    <div>
      <div className='flex justify-between'>
        <div>

        <h1 className='movieLetter cursor-pointer uppercase' onClick={() => { navigate("/") }}>
            <img src={MovieIcon} alt="" height={30} /> Title : {movie.title}
          </h1>
        </div>
        <br/>

      </div>
      <div className='mt-3 mb-3'>
        <Descriptions title="" bordered>
          <Descriptions.Item className='uppercase' label="Title"> {movie.title} </Descriptions.Item>
          <Descriptions.Item label="CATEGORY"> {movie.genre} </Descriptions.Item>
          <Descriptions.Item label="CAST">{movie.cast} </Descriptions.Item>
          <Descriptions.Item label="DIRECTOR"> {movie.director}</Descriptions.Item>
          <Descriptions.Item label="PRODUCER" span={2}> {movie.producer}</Descriptions.Item>
          <Descriptions.Item label="SYNOPSIS"> {movie.synopsis}</Descriptions.Item>
          <Descriptions.Item label="REVIEWS" span={2}>{movie.reviews} </Descriptions.Item>
          <Descriptions.Item label="POSTER" span={2}><img src={movie.poster} alt="" width={200} height={250} /> </Descriptions.Item>
          <Descriptions.Item label="TRAILER" span={2}>
            <iframe width="300" height="250" src={`https://www.youtube.com/embed/${movie.trailer}`} frameborder="0" />
          </Descriptions.Item>
          <Descriptions.Item label="MPAA-US film rating code"> {movie.rating}</Descriptions.Item>
        </Descriptions>
      </div>

      {isLoggedIn && view === "table" && <Table columns={columns} dataSource={shows} />}

      {/* <div className="flex justify-center">
        <div>
      <Button fullWidth title="BOOK MOVIE" type="submit" onClick={()=> navigate(`/movies/selectTime/${movie._id}`)} />
        </div>
      </div> */}
    </div>
  )
}

export default MoviePage