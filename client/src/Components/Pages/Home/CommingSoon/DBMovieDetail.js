import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../../action/movieDB'
import MainImage from '../Sections/MainImage'
import MovieInfo from './MovieInfo'
import { useParams } from "react-router-dom"



function DBMovieDetail() {

    const [Movie,setMovies] = useState([])
    const [video, setViedo] = useState([])
    const {movieId} = useParams();


    useEffect(()=> {      
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(response=> {
            console.log(response)
            setMovies(response)
        })
    },[movieId])


    useEffect(()=> {      
        fetch(`${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(response=> {
            console.log(response)
            setViedo(response)
        })
    },[movieId])
    
    
    return (
    <div>
        {/*Header*/}
        <MainImage 
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
        />

        {/*Body*/}
        <div style={{width:'85%', margin:'1rem auto'}}>
            <MovieInfo
                movie={Movie}
            />
        </div>
        <div className='flex justify-center'>
            <div class="video-box">
                <iframe
                title='video'
                src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=${video}&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
                
            </div>
        </div>

    </div>
  )
}

export default DBMovieDetail
