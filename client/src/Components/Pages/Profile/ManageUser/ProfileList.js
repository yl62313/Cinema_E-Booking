import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../Components/Button'
import ProfileForm from './ProfileForm';
import {Table} from 'antd'


function ProfileList() {
    const[showProfileFormModel = false, setShowProfileFormModel]=useState(false);
    const[selectedProfile=null, setSelectedProfile]=useState(null);
    const[formType="add",setFormType]=useState([]);
    const[profile=[],setProfile]=useState();

    const navigate = useNavigate();

    const columns = [
      {
        title:"Name",
        dateIndex: "title",
      },
      {
        title:"Phone Number",
        dateIndex: "phonenumber",
      },
      {
        title:"Address",
        dateIndex: "address",
      },
      
      {
        title:"Action",
        dateIndex: "action",
        render: (text,record) => {
          return(
            <div className='felx gap-1'>
              <i class="ri-edit-line"></i>
              <i class="ri-delete-bin-2-line" style={{color:"red"}}></i>
            </div>
          )
        }
      }
    ]

  return (
    <div>
        <div className="flex justify-end">
        <Button title="Edit Profile"
        onClick={()=>{
            setFormType("add");
            setShowProfileFormModel(true);
        }}
        />
        </div>
        <Table columns={columns} dataSource={profile}/>
        {showProfileFormModel && <ProfileForm
        showProfileFormModel={showProfileFormModel}
        setShowProfileFormModel={setShowProfileFormModel}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
        formType={formType}
        setFormType={setFormType}

        />}
    </div>
  )
}

export default ProfileList