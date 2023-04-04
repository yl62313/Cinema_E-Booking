import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY } from '../../../../action/movieDB'
import { useParams } from "react-router-dom"


function VideoInfo() {
    const [video, setVideo] = useState([]);
    const { movieId }= useParams();

    const getVideoDetails = async() => {
        const json = await(await fetch(`${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`)).json();
        setVideo(json.results[0].key); 
    }
    useEffect(()=> {
        getVideoDetails()
    }, [movieId])





  return (
    <div>
    <iframe
    width={640}
    height={320}
    title='video'
    src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=${video}&controls=0`}
    frameBorder="0"
    allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    />
    </div>
    )
}

export default VideoInfo