import { message, Table } from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getUser } from '../../../../action/users'
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';

function ManageUsers() {
    const [users, setUsers] = React.useState([]);
    const dispatch = useDispatch();
    const getUserList = async () => {
        try{
          dispatch(ShowLoading())
          const response = await getUser();
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
    const columns = [
        {
            title: "User Email",
            dataIndex: "title",
        },
        {
            title: "Delete User",
            dataIndex: "action",
            render: (text,record) => {
              return <div>
                <DeleteOutlined/>
                </div>
            }
          }

    ]
    useEffect(()=>{
        getUserList();
      },[])
  return (
    <div>
         < Table columns={columns} dataSource={users}/>
    </div>
  )
}

export default ManageUsers