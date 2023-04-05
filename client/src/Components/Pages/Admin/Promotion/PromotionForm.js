import { Modal, Form, Row, Col, message } from 'antd'
import Button from '../../../Button'
import moment from "moment";
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../reducers/loader_reducer';
import { AddPromotion, EditPromotion } from '../../../../action/promotion';

function PromotionForm ({
    showPromotionFormModal,
    setShowPromotionFormModal,
    selectedPromotion,
    setSelectedPromotion,
    getPromotionList,
    formType
}) {


    const dispatch = useDispatch();
    const onFinish = async(values) => {
        
        try{
            dispatch(ShowLoading())
            let response = null;
            if (formType === "add"){
                response = await AddPromotion(values);
            }else{
                response = await EditPromotion({
                    ...values,
                    promotionId : selectedPromotion._id
                });
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


    // if (selectedPromotion) {
    //     selectedPromotion.startDate = moment(selectedMovie.releaseDate).format(
    //       "YYYY-MM-DD"
    //     );
    // }


  return (
    <Modal
        title={formType === "add" ? "Add Promotion" : "Edit Promotion"}
        open={showPromotionFormModal}
        onCancel={()=> { setShowPromotionFormModal(false); setSelectedPromotion(null);}}
            footer={null}
            width={700}
        >
            <Form layout='vertical' onFinish={onFinish} className="mt-1"initialValues={selectedPromotion}>
                <Row
                gutter={16}>
                    <Col span={8}>
                        <Form.Item 
                        label="Promotion Name" 
                        name="name"
                        rules={[{ required: true, message: "Enter the promotion name" }]}>
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                        label="Promotion Code" 
                        name="code"
                        rules={[{ required: true, message: "Enter the promotion code" }]}>
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                        label="Discount"
                         name="discount"
                         rules={[{ required: true, message: "Enter the discount percentage" }]}>
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                         label="Start Date"
                          name="startDate"
                          rules={[{ required: true, message: "Enter the start date" }]}>
                            <input type="date" />
                            </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                        label="End Date" 
                        name="endDate"
                        rules={[{ required: true, message: "Enter the end date" }]}>
                            <input type="date"/>
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