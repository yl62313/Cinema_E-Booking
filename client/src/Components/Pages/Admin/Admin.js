import React from 'react'
import { Tabs } from 'antd'
import MovieList from './ManageMovies/MovieList'
import PromotionList from './Promotion/PromotionList'
import ManageUsers from './ManageUsers/ManageUsers'
import Proxy from '../../../action/proxy'
import { useNavigate } from 'react-router-dom';

function Admin({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  console.log(isLoggedIn);

  function logout() {
    handleLogout();
    navigate("/")
  }

  return (
    <div>
      <div className='admIn'>
        {!isLoggedIn ? (
          <>
            <div className='bg-white br-1 p-1 pl-2 pr-2 flex'>
              <h1 className=' loginLetter cursor-pointer' onClick={() => { navigate("/adminlogin") }}>
                {"Login"}
              </h1>
            </div>
          </>
        ) : (
          <>

            <div className='bg-white br-1 p-1 pl-2 pr-2 flex'>
              <h1 className='logoutLetter cursor-pointer' onClick={logout}>
                {"Logout"}
              </h1>
            </div>
          </>
        )}
      </div>

      <h1 className='text-2x flex justify-center'> Admin </h1>
      <br />
      <Tabs defaultActiveKey='1'>
      <Tabs.TabPane tab='Movies' key='1'>
        <Proxy isLoggedIn={isLoggedIn} component={<MovieList/>} message="Please log in to view this content." />
      </Tabs.TabPane>
      <Tabs.TabPane tab='Promotions' key='2'>
        <Proxy isLoggedIn={isLoggedIn} component={<PromotionList/>} message="Please log in to view this content." />
      </Tabs.TabPane>
      <Tabs.TabPane tab='Manage Users' key='3'>
        <Proxy isLoggedIn={isLoggedIn} component={<ManageUsers/>} message="Please log in to view this content." />
      </Tabs.TabPane>
    </Tabs>

    </div>
  )
}

export default Admin

