import { Descriptions } from 'antd'
import React from 'react'



function MovieInfo(props) {

    let {movie} = props;



  return (
    // <div>
    //     <Descriptions title="Movie Info" bordered>
    //         <Descriptions.Item label="TITEL">{movie.original_title}</Descriptions.Item>
    //         <Descriptions.Item label="CATEGORY">{movie.popularity}</Descriptions.Item>
    //         <Descriptions.Item label="CAST">{movie.revenue}</Descriptions.Item>
    //         <Descriptions.Item label="DIRECTOR">{movie.runtime}</Descriptions.Item>
    //         <Descriptions.Item label="PRODUCER" span={2}>
    //             {movie.vote_average}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="SYNOPSIS">{movie.vote_count}</Descriptions.Item>
    //         <Descriptions.Item label="REVIEWS">{movie.statue}</Descriptions.Item>
    //         <Descriptions.Item label="MPAA-US film rating code">{movie.popularity}</Descriptions.Item>
    //     </Descriptions>
    //     <div>
    <div>
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="TITLE">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="CATEGORY">Action</Descriptions.Item>
            <Descriptions.Item label="CAST">Micheal B. Jordan</Descriptions.Item>
            <Descriptions.Item label="DIRECTOR">Micheal B. Jordan</Descriptions.Item>
            <Descriptions.Item label="PRODUCER" span={2}>
            Micheal B. Jordan
            </Descriptions.Item>
            <Descriptions.Item label="REVIEWS">4/5</Descriptions.Item>
            <Descriptions.Item label="MPAA-US film rating code">PG-13</Descriptions.Item>
        </Descriptions>
        <div>
          
        </div>
    </div>
  )
}

export default MovieInfo