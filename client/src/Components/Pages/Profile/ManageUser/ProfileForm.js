import React from 'react'
import { Modal, Form, Row, Col } from 'antd'
import Button from '../../../../Components/Button'

function ProfileForm({
    showProfileFormModel,
    setShowProfileFormModel,
    selectedProfile,
    setSelectedProfile,
    formType,
    setFormType
}) {

    
  return (
    <Modal
    title={formType === 'add' ? "Add Profile" : 'Edit Profile'}
    open = {showProfileFormModel}
    onCancel={()=>{
        setShowProfileFormModel(false)
        setSelectedProfile(null)
    }}
    footer={null}
    >
        <Form layout='vertical'>
            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Input your name" }]}
            >
                <input type="text"></input>
            </Form.Item>
            <Form.Item
            label="Phone Number"
            name="Phone Number"
            rules={[{ required: true, message: "Input your Phone Number" }]}
            >
                <input type="text"></input>
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={[{ required: false, message: "Enter your Address" }]}
                >
                    <input type="address"/>
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item 
                  label="City"
                  name="city"
                  rules={[{ required: false, message: "Enter your City" }]}
                  >
                    <input type="city"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item 
                  label="State"
                  name="state"
                  rules={[{ required: false, message: "Enter your State" }]}
                  >
                    <input type="state"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item 
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: false, message: "Enter your Zip Code" }]}
                  >
                    <input type="zip"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[{ required: false, message: "Enter your Card Number" }]}
                >
                    <input type="text"/>
              </Form.Item>   
              </Col>
              <Col span={12}>  
              <Form.Item
                label="Name on Card"
                name="nameOnCard"
                rules={[{ required: false, message: "Enter your Name on Card" }]}
                >
                    <input type="text"/>
              </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item 
                  label="EXP"
                  name="exp"
                  rules={[{ required: false, message: "Enter your EXP" }]}
                  >
                    <input type="text"/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                  label="CVV"
                  name="cvv"
                  rules={[{ required: false, message: "Enter your 3 digits CVV" }]}
                  >
                    <input type="text"/>
                  </Form.Item>
                </Col>
              </Row>

            <div className='flex justify-end gap-1'>
                    <Button title='Cancel' type='button'
                    onClick={()=>{
                        setShowProfileFormModel(false)
                        setSelectedProfile(null)
                    }}
                    />
                    <Button title='Save' type='submit'/>
            </div>

        </Form>

    </Modal>
  )
}

export default ProfileForm