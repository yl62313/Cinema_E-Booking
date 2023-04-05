import { message, Table } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import Button from '../../../Button'
import PromotionForm from './PromotionForm';
import { BringPromotionList, DeletePromotion} from '../../../../action/promotion';


function PromotionList() {
  const [promotions, setPromotions] = React.useState([]);
  const [showPromotionFormModal, setShowPromotionFormModal]=React.useState(false);
  const [selectedPromotion,setSelectedPromotion]=React.useState(null);
  const [formType, setFormType]=React.useState("add");

  const dispatch = useDispatch();
  const getPromotionList = async () => {
    try{
      dispatch(ShowLoading())
      const response = await BringPromotionList();
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
  const deletePromotionList = async (promotionId) => {
    try {
      dispatch(ShowLoading())
      const response = await DeletePromotion({
        promotionId,
      });
      if(response.success){
        getPromotionList();
      }else{
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  //name, promotion code, discount, start and end date
  const columns = [
    {
      title: "Promotion Name",
      dataIndex: "name",
    },
    {
      title: "Promotion Code",
      dataIndex: "code",
      // render: (text,record)=> {
      //   return(
      //     <img
      //     src={record.poster}
      //     alt="poster"
      //     width='100'
      //     height='100'
      //     />
      //   )
      // }
    },
    {
      title: "Discount Percent",
      dataIndex: "discount",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render : (text,record) => {
        return moment(record.scheduleDate).format("YYYY-MM-DD")
      }
    },
    {
      title: "End date",
      dataIndex: "endDate",
      render : (text,record) => {
        return moment(record.scheduleDate).format("YYYY-MM-DD")
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text,record) => {
        return <div className='flex gap-1'>
          <EditOutlined 
          onClick={()=>{
            setSelectedPromotion(record);
            setFormType("edit");
            setShowPromotionFormModal(true);
          }}/>
          <DeleteOutlined 
          onClick={()=> {
            deletePromotionList(record._id);
          }}/>
          </div>
      }
    }
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
      <Table columns={columns} dataSource={promotions}/>
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