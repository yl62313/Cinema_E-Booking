import React from 'react'
import Button from '../../../Button'
import MovieForm from './MovieForm';


function MovieList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal]=React.useState(false);
  const [selectedMovie,setSelectedMovie]=React.useState(null);
  const [formType, setFormType]=React.useState("add");


  
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
