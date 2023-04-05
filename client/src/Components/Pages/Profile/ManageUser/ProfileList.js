import React, { useEffect, useState } from 'react'
import { EditOutlined} from '@ant-design/icons'
import Button from '../../../../Components/Button'
import ProfileForm from './ProfileForm';
import {message, Table} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { BringProfileList } from '../../../../action/users';


{/* If u want to listed profile list, pls make BringProfileList api at cilent server (action-> user.js and server route as well) */}

function ProfileList() {

    const[showProfileFormModel = false, setShowProfileFormModel]=useState(false);
    const[selectedProfile=null, setSelectedProfile]=useState(null);
    const[formType="add",setFormType]=useState([]);
    const[profile=[],setProfile]=useState();

    const dispatch = useDispatch();
    const getProfileList = async () => {
      try{
        dispatch(ShowLoading())
        const response = await BringProfileList();
        if(response.success){
          setProfile(response.data);
        }else{
          message.error(response.message);
        }
        dispatch(HideLoading());
      }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
      }
    }
    
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
          return <div className='flex gap-1'>
            <EditOutlined 
            onClick={()=>{
              setSelectedProfile(record);
              setFormType("edit");
              setShowProfileFormModel(true);
            }}/>
            </div>
        }
      }
    ]


    useEffect(()=>{
      getProfileList();
    },[])
  
  return (
    <div>
        <div className="flex justify-end mb-2">
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