import React from 'react'
import {Tabs} from 'antd'
import ProfileList from './ManageUser/ProfileList'
import { useNavigate } from 'react-router-dom';
import TicketList from './TicketList/TicketList';


function Profile({userEmail}) {
  const navigate = useNavigate();
  console.log(userEmail);
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
                <TicketList userEmail={userEmail}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Edit Profile" key="2">
                <ProfileList userEmail={userEmail}/>
            </Tabs.TabPane>
        </Tabs>


    </div>
  )
}

export default Profile
