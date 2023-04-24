import React from 'react'
import {Tabs} from 'antd'
import ProfileList from './ManageUser/ProfileList'
import { useNavigate } from 'react-router-dom';
import TicketList from './TicketList/TicketList';


function Profile({user}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className='admIn'>
      <div className='bg-white br-1 p-1 pr-1'>
      <h1 className='registerLetter cursor-pointer' onClick={() => { navigate("/") }}>
                    {"HOME"}
      </h1>
      </div>
      </div>
        <h1 className='text-2xl cursor-pointer flex justify-center'  onClick={() => { navigate("/") }}> Profile </h1>
        <br/>
        
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab="Booking" key="1">
                <TicketList user={user}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Edit Profile" key="2">
                <ProfileList user={user}/>
            </Tabs.TabPane>
        </Tabs>


    </div>
  )
}

export default Profile
