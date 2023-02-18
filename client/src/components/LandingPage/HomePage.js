import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Col, Card, Row} from 'antd';
import Meta from 'antd/lib/card/Meta'
import SearchBar from './Sections/SearchBar'
import CheckBox from './Sections/CheckBox'
import {continents} from './Sections/HomePageData'
import sample from '../../sample/Minions-The-Rise-of-Gru.jpg'

function HomePage() {
  const [Movies, setMovies] = useState([])
  const [SearchTerm, setSearchTerm] = useState("")


    useEffect(()=>{
    
        axios.post('/api/movie/movies')
        .then(response => {
          if (response.data.success){

            setMovies(response.data.productInfo)

          } else {
                alert("")
          } 
        })
    })

    const renderCards = Movies.map((movie, index)=>{
      return <Col lg={6} md={8} xs={24} key={index}>
      <Card
              cover={<a href={`movie/${movie._id}`}><img style={{width:'100%',maxHeight:'150px'}} src={`http://localhost:3000/${movie.images[0]}`} /></a>}
      >
        <Meta
          title={movie.title}
        />
      </Card>
      </Col>
    })
    //검색을 서버에 전달해서 서버에서 알맞은 정보를 찾게 한다
    const updateSearchTerm = (newSearchTerm) => {
      setSearchTerm(newSearchTerm)

      let body ={
        skip: 0,
        SearchTerm: newSearchTerm
      }
      setSearchTerm(newSearchTerm)
      //getMovies(body)
    }





  return (
    <div style={{width: '75%', margin: '3rem auto'}}>
      <div style={{textAlign: 'center'}}>
        <h2>Currently Showing</h2>
      </div>

      {/* Filter */}
      <CheckBox list={continents}/>
      {/* Search */}
      <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
      <SearchBar
        refreshFunction={updateSearchTerm}
      />
      </div>
     
      {/* Card */}
      <div>
      <img src={sample} alt='sample picture' />
      </div>
      <Row gutter={[16,16]} >

      {renderCards}

      </Row>

      



    </div>
  )
}

export default HomePage