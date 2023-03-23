import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../../action/movieDB'
import MainImage from './Sections/MainImage'
import GridCards from './Sections/GridCards'
import { Row } from 'antd';
import SecondHome from './SecondHome/SecondHome';
import { useNavigate } from 'react-router-dom';
import MovieIcon from '../../../samplePicture/pngegg.png'


function Home() {
  const navigate = useNavigate();
  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)
  useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetch(endpoint)
      .then(response=>response.json())
      .then(response => {
        console.log(response.results)
        setMovies([...response.results])
        setMainMovieImage(response.results[0])
    })
    }, [])

return (
  <div style = {{width:'100%', margin:'0'}}>
    <div className='layout p-1'>
      <div className='header flex justify-between'>
        <div>
          <h1 className='text-2xl'>
          <img src={MovieIcon} alt="" height={25}/>
           {"MOVIE"}
         </h1>
        </div>
        <div className='header flex justify-between gap-1'>
          <div className='bg-white br-1 p-1 flex'>
            <h1 className='text-sm cursor-pointer' onClick={()=>{navigate("/register")}}>
              {"Register"}
            </h1>
          </div>
          <div className='bg-white br-1 p-1 flex'>
            <h1 className='text-sm cursor-pointer' onClick={()=>{navigate("/login")}}>
              {"Login"}
            </h1>
          </div>
          <div className='bg-white br-1 p-1 flex'>
            <h1 className='text-sm cursor-pointer' onClick={()=>{localStorage.removeItem("token"); navigate("/login")}}>
              {"Logout"}
            </h1>
          </div>
          </div>
      </div>
    </div>
      {/* Main Image */}
      {MainMovieImage &&
          <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
          />
          } 
          <div style={{width:'85%', margin:'1rem auto'}}>
          <h2>now showing</h2>
          <SecondHome/>
          </div>
          <div style={{width:'85%', margin:'1rem auto'}}>
            <h2>comming soon</h2>
            <hr />

            {/* movie grid card */}
          
            <Row gutter={[16, 16]}> 
              {Movies && Movies.map((movie, index)=> (
                <React.Fragment key={index}>
                  <GridCards image={movie.poster_path ? 
                  `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                  movieId={movie.id}
                  movieName={movie.original_title}
                  />
                </React.Fragment>
              ))}
            </Row>
          </div>
          <div>
          </div>
        </div>
    )
}

export default Home