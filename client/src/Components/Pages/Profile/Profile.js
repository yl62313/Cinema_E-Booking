import React from 'react'
import {Tabs} from 'antd'
import ProfileList from './ManageUser/ProfileList'


function Profile() {
  return (
    <div>
        <h1 className='text-2xl'> Profile </h1>
        <br/>
        
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab="Booking" key="1">
                Booking
            </Tabs.TabPane>
            <Tabs.TabPane tab="Edit Profile" key="2">
                <ProfileList/>
            </Tabs.TabPane>
        </Tabs>


    </div>
  )
}

export default Profile
