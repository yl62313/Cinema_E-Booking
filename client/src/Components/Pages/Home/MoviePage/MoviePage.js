import React, {useEffect, useState} from 'react'
import MainImage from '../Sections/MainImage'
import MovieInfo from '../CommingSoon/MovieInfo'
import { useParams,useNavigate } from "react-router-dom"
import VideoInfo from '../CommingSoon/VideoInfo'
import MovieIcon from '../../../../samplePicture/pngegg.png'



function MoviePage() {
    const navigate = useNavigate();
    const [Movie,setMovies] = useState([])
    const {movieId} = useParams();


    useEffect(()=> {      
        fetch(`api/movie/bring-movie-byid/${movieId}`)
        .then(response => response.json())
        .then(response=> {
            console.log(response)
            setMovies(response)
        })
    },[movieId])


    return (
    <div>
            <div className='layout p-1'>
      <div className='header flex justify-between'>
        <div>
          <h1 className='text-2xl cursor-pointer' onClick={()=>{navigate("/")}}>
          <img src={MovieIcon} alt="" height={25}/>
           {"MOVIE"}
         </h1>
        </div>
          <div className='bg-white br-1 p-1 flex'>
            <h1 className='text-sm cursor-pointer' onClick={()=>{navigate("/register")}}>
              {"Register"}
            </h1>
          </div>
      </div>
    </div>
        {/*Header*/}
        <MainImage
            image={`w1280${Movie.poster}`}
            title={Movie.title}
            text={Movie.synopsis}
        />
        

        {/*Body*/}
        <div style={{width:'85%', margin:'1rem auto'}}>
            <MovieInfo
                movie={Movie}
            />
        </div>
        <div className='flex justify-center'>
            <VideoInfo/>
        </div>
 
    </div>
  )
}

export default MoviePage
