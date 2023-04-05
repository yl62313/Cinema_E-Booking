import React from 'react'
import {Tabs} from 'antd'
import MovieList from './ManageMovies/MovieList'
import PromotionList from './Promotion/PromotionList'
import ManageUsers from './ManageUsers/ManageUsers'

function Admin() {
  return (
    <div>
    <h1 className='text-2xl'> Admin </h1>
    <br/>
    <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Movies" key="1">
            <MovieList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Promotions" key="2">
            <PromotionList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Manage Users" key="3">
            <ManageUsers />
        </Tabs.TabPane>
    </Tabs>
 
</div>
  )
}

export default Admin