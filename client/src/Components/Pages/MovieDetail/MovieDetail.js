import React from 'react'
import { useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router-dom"
import moment from "moment";


function MovieDetail() {
  const [movie, setMovie] = React.useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );


return movie && (
<div>
  {/*movie info*/}
  <div className='flex justify-between'>
      <div>
          <h1 className='text-3xl'>
              Title : {movie.title} Minions
          </h1>
          <h1 className='text-md'>
              Duration : {movie.duration} 120 min
          </h1>
          <h1 className='text-md'>
              Genre : {movie.Genre} Animation
          </h1>
      </div>
      {/*Choose Date*/}
      <div>
          <h1 className='text-md'>
              Select Date: 
          </h1>
          <input type = 'date'
          min={moment().format("YYYY-MM-DD")}
          value={date}
          onChange={(e) => {
              setDate(e.target.value);
              navigate(`/movie/${params.id}?date=${e.target.value}`);
            }}
          />
      </div>
  </div>
  <br/>

  <hr/>
  <div>
      <h1 className='text-3xl'>Times</h1>
  </div>

  {/* Time with data base, now is just sample */}
  <div className='flex flex-col gap-1'>
      <div className='card p-3'>

          <div className='flex gap-2 cursor-pointer'>
              <div className='card p-1'
              onClick={()=> navigate(`/movie/seat`)}>
                  <h1 className='text-sm'>11:00am</h1>
              </div>
              <div className='card p-1'
              onClick={()=> navigate(`/movie/seat`)}>
                  <h1 className='text-sm'>12:00am</h1>
              </div>
              <div className='card p-1'
              onClick={()=> navigate(`/movie/seat`)}>
                  <h1 className='text-sm'>1:00pm</h1>
              </div>
          </div>
      </div>
  </div>
  </div>

)
}

export default MovieDetail