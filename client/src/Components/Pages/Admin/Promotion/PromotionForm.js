import React from 'react'
import {Form, Row, Col, message, Modal} from "antd"
import Button from '../../../Button';
import { AddPromotion } from '../../../../action/promotion';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';

function PromotionForm({
  showPromotionFormModal,
  setShowPromotionFormModal,
  selectedPromotion,
  setSelectedPromotion,
  getPromotionList,
  formType
}) {
  const dispatch = useDispatch();
  const onFinish = async(values) => {
    try {
        dispatch(ShowLoading())
        let response = null;
        if (formType === "add"){
            response = await AddPromotion(values);
        }else{
          message.error(response.message);
        }
        if(response.success){
            getPromotionList()
            message.success(response.message);
            setShowPromotionFormModal(false);
        }
        else{
            message.error(response.message);
        }
        dispatch(HideLoading());
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
  }

  return (
    <Modal
    title={formType === "add"}
    open={showPromotionFormModal}
    onCancel={()=> { setShowPromotionFormModal(false); setSelectedPromotion(null);}}
        footer={null}
        width={700}
    >
        <Form layout='vertical' onFinish={onFinish} initialValues={selectedPromotion}>
            <Row
            gutter={16}>
                <Col span={24}>
                    <Form.Item label="Promotion name" name="name" rules={[{ required: true, message: "Enter the promotion name" }]}>
                        <input type="text"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Promotion code" name="code" rules={[{ required: true, message: "Enter the promotion code" }]}>
                        <textarea type="text"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Discount %" name="discount" rules={[{ required: true, message: "Enter the promotion's discount" }]}>
                        <input type="text"/>
                    </Form.Item> 
                </Col>
                  <Col span={12}>
                    <Form.Item
                    label="Start Date"
                    name="startDate"
                    rules={[{ required: true, message: "Enter the start date" }]}
                    >
                    <input type="date" />
                   </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                    label="End Date"
                    name="endDate"
                    rules={[{ required: true, message: "Enter the end date" }]}
                    >
                    <input type="date" />
                    </Form.Item>
                  </Col>
                  </Row>
            <div className='flex justify-end gap-1'>
                <Button title='Cancel' type='button'
                onClick={()=>{
                    setShowPromotionFormModal(false)
                    setSelectedPromotion(null)
                }}
                />
                <Button title='Save' type='submit'/>
            </div>
        </Form>
</Modal>
   
  )
}

export default PromotionForm