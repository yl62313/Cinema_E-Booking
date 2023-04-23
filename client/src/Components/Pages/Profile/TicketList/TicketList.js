import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetTickets } from '../../../../action/checkout';
import { BringProfileList } from '../../../../action/users';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';

function TicketList(props) {
  console.log("userEmail:", props.userEmail);
    const [checkouts , setCheckOut] = useState([]);
    const [profile, setProfile] = useState([]);
    const dispatch = useDispatch();


    const getTicketData = async () => {
      try {
        dispatch(ShowLoading())
        const response = await GetTickets();
        if(response.success){
          setCheckOut(response.data);
        }else{
          message.error(response.message)
        }
        dispatch(HideLoading())
        }catch(error){
          dispatch(HideLoading())
          message.error(error.message)
        }
    };

    const getProfileList = async () => {
      try {
        dispatch(ShowLoading())
        const response = await BringProfileList(props.userEmail);
        if (response.success) {
          setProfile(response.data._id.toString());
        } else {
          message.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };


    useEffect(() => {
      getTicketData();
      getProfileList();
    }, []);


    const columns = [
        {
            title: "Movie",
            dataIndex: 'show',
            render: show => show.movie.title
        },
        {
            title: "Date",
            dataIndex: 'show',
            render: show => show.date
        },
        {
            title: "time",
            dataIndex: 'show',
            render: show => show.time
        },
        {
            title: "Seats",
            dataIndex: 'seats',
            render: seats => seats.join(", ")
        },
        {
            title: "confirmation code",
            dataIndex: 'transactionId',
        },
    ]

    
  return (
    <div>
        < Table columns={columns} dataSource={checkouts} />
    </div>
  )
}

export default TicketList