import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetTickets } from '../../../../action/checkout';
import { BringProfileList } from '../../../../action/users';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import moment from 'moment';

function TicketList(props) {
    const [checkouts , setCheckOut] = useState([]);
    const [profile, setProfile] = useState([]);
    const dispatch = useDispatch();


    const getTicketData = async () => {
      console.log(profile[0]);
      try {
        dispatch(ShowLoading())
        const response = await GetTickets(profile[0]._id);
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
        const response = await BringProfileList(props.user.email)
        if (response.success) {
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


    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(ShowLoading())
          const profileResponse = await BringProfileList(props.user.email)
          if (profileResponse.success) {
            setProfile([profileResponse.data]);
            const ticketsResponse = await GetTickets(profileResponse.data._id);
            if (ticketsResponse.success) {
              setCheckOut(ticketsResponse.data);
            } else {
              message.error(ticketsResponse.message)
            }
          } else {
            message.error(profileResponse.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      }
      fetchData();
    }, []);
    

    const columns = [
        {
            title: "Movie",
            dataIndex: 'show',
            render: show => show.movie.title
        },
        {
          title: "Poster",
          dataIndex: "show",
          render: (text, record) => (
            <img src={record.show.movie.poster} alt="poster" width="100" height="100" />
        )},
        {
            title: "Date",
            dataIndex: 'show',
            render: show => moment(show.date).format("MM/DD/YYYY")
        },
        {
            title: "Time",
            dataIndex: 'show',
            render: show => show.time
        },
        {
            title: "Seats",
            dataIndex: 'seats',
            render: seats => seats.join(", ")
        },
        {
          title: "Price",
          dataIndex: 'totalPrice',
          render: price => `$${Number(price.toFixed(2))}`
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