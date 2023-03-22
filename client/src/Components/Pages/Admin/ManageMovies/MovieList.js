import React, { useEffect } from 'react'
import Button from '../../../Button'
import MovieForm from './MovieForm';
import {message, Table} from 'antd'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { GetAllMovies } from '../../../../action/movies';



function MovieList() {
  const [showMovieFormModal, setShowMovieFormModal]=React.useState(false);
  const [selectedMovie,setSelectedMovie]=React.useState(null);
  const [formType, setFormType]=React.useState("add");
  const [movies, setMovies] = React.useState([]);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      }else{
        message.error(response.message)
      }
      dispatch(HideLoading());
      }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
      }
    }


  const columns = [
    {
      title:"Name",
      dateIndex: "title",
    },
    {
      title:"Desctiption",
      dateIndex: "description",
    },
    {
      title:"Duration",
      dateIndex: "duration",
    },
    {
      title:"Genre",
      dateIndex: "genre",
    },
    {
      title:"Action",
      dateIndex: "action",
      render: (text,record) => {
        return(
          <div className='felx gap-1'>
            <i class="ri-edit-line"></i>
            <i class="ri-delete-bin-2-line" style={{color:"red"}}></i>
          </div>
        )
      }
    }
  ]

  useEffect(()=>{
    getData();
  },[]);


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
        />}
    </div>
  )
}
export default MovieList
