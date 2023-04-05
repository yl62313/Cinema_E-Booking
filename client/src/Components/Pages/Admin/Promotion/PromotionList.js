import { message, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {AddPromotion} from '../../../../action/promotion'
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import Button from '../../../Button';
import PromotionForm from './PromotionForm';


function PromotionList() {
  const [promotions, setPromotions] = React.useState([]);
  const [formType, setFormType]=React.useState("add");
  const [showPromotionFormModal, setShowPromotionFormModal]=React.useState(false);
  const [selectedPromotion,setSelectedPromotion]=React.useState(null);




  const dispatch = useDispatch();
    const getPromotionList = async () => {
      try{
        dispatch(ShowLoading())
        const response = await AddPromotion();
        if(response.success){
          setPromotions(response.data);
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
        title: "Promotion Name",
        dataIndex: "name",
    },
    {
      title: "Promotion code",
      dataIndex: "code",
    },
    {
      title: "Discount %",
      dataIndex: "discount",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },

    ]
    useEffect(()=>{
      getPromotionList();
    },[])

  return (
    <div>
      <div className='flex justify-end mb-2' >
        <Button title="Add Promotion"
        onClick={()=>{
          setFormType("add");
          setShowPromotionFormModal(true);
        }}
        />
      </div>
      < Table columns={columns} dataSource={promotions}/>
      {showPromotionFormModal && <PromotionForm
        showPromotionFormModal={showPromotionFormModal}
        setShowPromotionFormModal={setShowPromotionFormModal}
        selectedPromotion={selectedPromotion}
        setSelectedPromotion={setSelectedPromotion}
        formType={formType}
        getPromotionList={getPromotionList}

        />}
    </div>
  )
}

export default PromotionList