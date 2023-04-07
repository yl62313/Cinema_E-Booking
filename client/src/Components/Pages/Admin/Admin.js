import React from 'react'
import { Tabs } from 'antd'
import MovieList from './ManageMovies/MovieList'
import PromotionList from './Promotion/PromotionList'
import ManageUsers from './ManageUsers/ManageUsers'
import { useNavigate } from 'react-router-dom';

function Admin({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    function logout() {
        handleLogout();
        navigate("/")
    }
    
    return (
        <div>
            <div className='header flex justify-between gap-1'>
            {!isLoggedIn ? (
              <>
                
                <div className='bg-white br-1 p-1 pr-3 flex'>
                  <h1 className=' loginLetter cursor-pointer' onClick={() => { navigate("/adminlogin") }}>
                    {"Login"}
                  </h1>
                </div>
              </>
            ) : (
              <>
                
                <div className='bg-white br-1 p-1 pr-3 flex'>
                  <h1 className='loginLetter cursor-pointer' onClick={logout}>
                    {"Logout"}
                  </h1>
                </div>
              </>
            )}
          </div>
            <h1 className='text-2xl'> Admin </h1>
            <br />
            {isLoggedIn && (
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Movies" key="1">
                    <MovieList/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Promotions" key="2">
                    <PromotionList />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Manage Users" key="3">
                    <ManageUsers />
                </Tabs.TabPane>
            </Tabs>
            )}

        </div>
    )
}

export default Admin