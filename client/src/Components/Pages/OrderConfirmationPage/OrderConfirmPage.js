import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetTickets } from '../../../action/checkout';
import { HideLoading, ShowLoading } from '../../../reducers/loader_reducer'

function OrderConfirmPage() {
    const [tickets=[],setTickets] = useState([]);
    const dispatch = useDispatch();



    const getTicket = async () =>{
        try{
            dispatchEvent(ShowLoading());
            const response = await GetTickets();
            if(response.success){
                setTickets(response.data);
            }else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        }catch(error){
            dispatch(HideLoading());
            message.error(error.message)
        }
    }
    useEffect(()=> {
        getTicket()
    },[]);

  return (
    <div>
        {tickets.map}
    </div>
  )
}

export default OrderConfirmPage