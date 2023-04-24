import React, { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import Button from '../../../../Components/Button'
import ProfileForm from './ProfileForm';
import { message, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { BringProfileList } from '../../../../action/users';


{/* If u want to listed profile list, pls make BringProfileList api at cilent server (action-> user.js and server route as well) */ }


function ProfileList(props) {
  console.log("userEmail:", props.userEmail);

  const [showProfileFormModel = false, setShowProfileFormModel] = useState(false);
  const [selectedProfile = null, setSelectedProfile] = useState(null);
  const [formType = "add", setFormType] = useState([]);
  const [profile, setProfile] = useState([]);
  
  const dispatch = useDispatch();
  const getProfileList = async () => {
    try {
      dispatch(ShowLoading())
      const response = await BringProfileList(props.user.email);
      if (response.success) {
        const profileData = {
          key: `${response.data._id}`,
          firstName: `${response.data.firstName}`,
          lastName: `${response.data.lastName}`,
          phoneNumber: `${response.data.phoneNumber}`,
          street: `${response.data.street}`, 
          city: `${response.data.city}`,
          state: `${response.data.state}`,
          action: "",
        };
        setProfile([response.data]);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      render: (text, record) => {
        return `${record.firstName} ${record.lastName}`
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      render: (text, record) => {
        return `${record.street} ${record.city}, ${record.state} ${record.zipCode}`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div className='flex gap-1'>
          <EditOutlined
            onClick={() => {
              setSelectedProfile(record);
              setFormType("edit");
              setShowProfileFormModel(true);
            }} />
        </div>
      }
    }
  ];


  useEffect(() => {
    getProfileList();
  }, [])

  useEffect(() => {
    if (!showProfileFormModel) {
      getProfileList();
    }
  }, [showProfileFormModel]);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button title="Edit Profile"
          onClick={() => {
            setFormType("add");
            setShowProfileFormModel(true);
          }}
        />
      </div>
      <Table columns={columns} dataSource={profile} />
      {showProfileFormModel && <ProfileForm
        showProfileFormModel={showProfileFormModel}
        setShowProfileFormModel={setShowProfileFormModel}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
        formType={formType}
        setFormType={setFormType}
        user = {props.user}
        profile={profile}
      />}
    </div>
  )
}

export default ProfileList