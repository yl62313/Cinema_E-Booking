import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../../action/movieDB'
import MainImage from '../Sections/MainImage'
import MovieInfo from './MovieInfo'
import { useParams,useNavigate } from "react-router-dom"
import VideoInfo from './VideoInfo'
import MovieIcon from '../../../../samplePicture/pngegg.png'



function DBMovieDetail() {
    const navigate = useNavigate();
    const [Movie,setMovies] = useState([])
    const {movieId} = useParams();


    useEffect(()=> {      
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
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
        <h1 className='movieLetter cursor-pointer' onClick={()=>{navigate("/")}}>
          <img src={MovieIcon} alt="" height={30}/>
           {"MOVIE"}
         </h1>
        </div>
        <div className='bg-white br-1 p-1 pr-3 flex'>
            <h1 className='registerLetter cursor-pointer' onClick={()=>{navigate("/register")}}>
              {"Register"}
            </h1>
          </div>
      </div>
    </div>
        {/*Header*/}
        <MainImage
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
        />
        

        {/*Body*/}
        <br/>
        <br/>
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

export default DBMovieDetail
