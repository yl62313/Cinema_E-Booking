import React from 'react'
import { Tabs } from 'antd'
import MovieList from './ManageMovies/MovieList'
import PromotionList from './Promotion/PromotionList'
import ManageUsers from './ManageUsers/ManageUsers'
import Proxy from '../../../action/proxy'
import { useNavigate } from 'react-router-dom';

function Admin({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

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
      {isLoggedIn && (
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Movies' key='1'>
            {isLoggedIn ? <MovieList /> : <div>Please log in to view this content.</div>}
          </Tabs.TabPane>
          <Tabs.TabPane tab='Promotions' key='2'>
            {isLoggedIn ? <PromotionList /> : <div>Please log in to view this content.</div>}
          </Tabs.TabPane>
          <Tabs.TabPane tab='Manage Users' key='3'>
            {isLoggedIn ? <ManageUsers /> : <div>Please log in to view this content.</div>}
          </Tabs.TabPane>
        </Tabs>
      )}

    </div>
  )
}

export default Admin


