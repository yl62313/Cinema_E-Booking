import React from 'react'
import {Tabs} from 'antd'


function Admin() {
  return (
    <div>
      <h2>ADMIN</h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
            
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin