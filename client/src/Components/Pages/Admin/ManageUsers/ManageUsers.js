import { Input, message, Table } from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BringUserList, DeleteUser, UpdateUser } from '../../../../action/users'
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';

function ManageUsers() {
    const [users, setUsers] = React.useState([]);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const getUserList = async () => {
        try{
          dispatch(ShowLoading())
          const response = await BringUserList();
          if(response.success){
            setUsers(response.data);
          }else{
            message.error(response.message);
          }
          dispatch(HideLoading());
        }catch(error){
          dispatch(HideLoading());
          message.error(error.message);
        }
      }
      const statusChange = async (user) => {
        try {
          dispatch(ShowLoading());
          const response = await UpdateUser({
            userId: user._id,
            ...user,
            userStatus: user.userStatus === "ACTIVE"?"SUSPENDED":"ACTIVE",
          });
          if (response.success) {
            message.success(response.message);
            getUserList();
          } else {
            message.error(response.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };
      const deleteUserList = async (userId) => {
        try {
          dispatch(ShowLoading())
          const response = await DeleteUser({
            userId,
          });
          if(response.success){
            getUserList();
          }else{
            message.error(response.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      }

      const handleSearch = e => {
        setSearchText(e.target.value);
      };
      const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );

    const columns = [
        {
            title: "User Email",
            dataIndex: "email",

        },
        {
          title: "Status",
          dataIndex: "userStatus",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text,record) => {
              return (
              <div className='flex gap-1 items-center'>
                {record.userStatus=="ACTIVE" && ( 
                <span 
                className="underline"
                onClick={()=>{
                  statusChange(record)
                }}>Block</span>
                )}
                {record.userStatus=="INACTIVE" && ( 
                <span 
                className="underline"
                onClick={()=>{
                  statusChange(record)
                }}>Active</span>
                )}
                {record.userStatus=="SUSPENDED" && ( 
                <span 
                className="underline"
                onClick={()=>{
                  statusChange(record)
                }}>Active</span>
                )}
                <i><DeleteOutlined onClick={()=> {
                  deleteUserList(record._id);
                  }}/></i>
              </div>
              )
            }
          }

    ]


    useEffect(()=>{
        getUserList();
      },[])

  return (
    <div>
      <Input.Search className='pb-2 w-2 pl-1' placeholder="Search users" onChange={handleSearch} />
      < Table columns={columns} dataSource={filteredUsers} />

    </div>
  )
}

export default ManageUsers