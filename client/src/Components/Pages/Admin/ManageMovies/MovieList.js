import { message, Table } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import Button from '../../../Button'
import MovieForm from './MovieForm';
import {BringMovieList, DeleteMovie} from '../../../../action/movies'


function MovieList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal]=React.useState(false);
  const [selectedMovie,setSelectedMovie]=React.useState(null);
  const [formType, setFormType]=React.useState("add");

  const dispatch = useDispatch();
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
  const deleteMovieList = async (movieId) => {
    try {
      dispatch(ShowLoading())
      const response = await DeleteMovie({
        movieId,
      });
      if(response.success){
        getMovieList();
      }else{
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text,record)=> {
        return(
          <img
          src={record.poster}
          alt="poster"
          width='100'
          height='100'
          />
        )
      }
    },
    {
      title: "Synopsis",
      dataIndex: "synopsis",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Release Date",
      dataIndex: "schedule",
      render : (text,record) => {
        return moment(record.scheduleDate).format("YYYY-MM-DD")
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text,record) => {
        return <div className='flex gap-1'>
          <EditOutlined 
          onClick={()=>{
            setSelectedMovie(record);
            setFormType("edit");
            setShowMovieFormModal(true);
          }}/>
          <DeleteOutlined 
          onClick={()=> {
            deleteMovieList(record._id);
          }}/>
          </div>
      }
    }
  ]

  useEffect(()=>{
    getMovieList();
  },[])

  return (
    <div>
      <div className='flex justify-end mb-2' >
        <Button title="Add Movie"
        onClick={()=>{
          setFormType("add");
          setShowMovieFormModal(true);
        }}
        />
      </div>
      <Table columns={columns} dataSource={movies}/>
      {showMovieFormModal && <MovieForm
        showMovieFormModal={showMovieFormModal}
        setShowMovieFormModal={setShowMovieFormModal}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        formType={formType}
        getMovieList={getMovieList}

        />}
    </div>
  )
}
export default MovieList
