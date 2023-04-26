import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditProfile } from '../../../../action/users';
import { Modal, Form, Row, Col, message, Select } from 'antd';
import Button from '../../../../Components/Button';
import { Checkbox } from 'antd';

const { Option } = Select;

function ProfileForm({
  showProfileFormModel,
  setShowProfileFormModel,
  setSelectedProfile,
  formType,
  user,
  profile
}) {

  const [selectedCardType, setSelectedCardType] = useState(null);


  const onFinish = async (values) => {
    try {
      const response = await EditProfile(user.email, values);
      if (response.success) {
        message.success(response.message);
        setShowProfileFormModel(false)
        setSelectedProfile(response.profile)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  const handleCardTypeChange = (value) => {
    setSelectedCardType(value);

  };

  return (
    <Modal
      title={formType === 'add' ? "Add Profile" : 'Edit Profile'}
      open={showProfileFormModel}
      onCancel={() => {
        setShowProfileFormModel(false)
        setSelectedProfile(null)
      }}
      footer={null}
    >
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="firstName"
          initialValue={profile[0].firstName}
        >
          <input type="text"></input>
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          initialValue={profile[0].lastName}
        >
          <input type="text"></input>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          initialValue={profile[0].phoneNumber}
        >
          <input type="text"></input>
        </Form.Item>
        <Form.Item
          label="Current Password"
          name="currentPassword"
          initialValue={user.password}
        >
          <input type='password' />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
        >
          <input type="password" />
        </Form.Item>
        <Form.Item
          label="Street"
          name="street"
          initialValue={profile[0].street}
        >
          <input type="address" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="City"
              name="city"
              initialValue={profile[0].city}
            >
              <input type="city" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="State"
              name="state"
              initialValue={profile[0].state}
            >
              <input type="state" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Zip Code"
              name="zipCode"
              initialValue={profile[0].zipCode}
            >
              <input type="zip" />
            </Form.Item>
          </Col>
        </Row>
        {/* <div className='mb-2'>
          <h5 className="text-l mb-1">Card Information</h5>
          <Select onChange={handleCardTypeChange} className="w-1" defaultValue={selectedCardType || "Select Card"}>
            <Option value="card1">card1</Option>
            <Option value="card2">card2</Option>
            <Option value="card3">card3</Option>
          </Select>
        </div>
        {selectedCardType === 'card1' && ( */}
        <div>
          <div style={{ marginBottom: '2.5rem' }}></div>
          <h4>Card 1</h4>
          <hr />
          <div style={{ marginBottom: '1rem' }}></div>
          <div style={{ marginBottom: '2.5rem' }}>
            <Form.Item
              label="Card 1 Number"
              name="cardNumber1"
              initialValue={profile[0].cardNumber1}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Name on Card 1"
              name="nameOnCard1"
              initialValue={profile[0].nameOnCard1}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="EXP"
              name="exp1"
              initialValue={profile[0].exp1}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Card Type"
              name="cardType1"
              initialValue={profile[0].cardType1}
            >
              <Select placeholder="Select card type">
                <Option value="AMEX">AMEX</Option>
                <Option value="VISA">VISA</Option>
                <Option value="MASTERCARD">MASTERCARD</Option>
                <Option value="MASTERCARD">DISCOVER</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        {/* )} */}
        {/* {selectedCardType === 'card2' && ( */}
        <div>
          <h4>Card 2</h4>
          <hr />
          <div style={{ marginBottom: '1rem' }}></div>
          <div style={{ marginBottom: '2.5rem' }}>
            <Form.Item
              label="Card 2 Number"
              name="cardNumber2"
              initialValue={profile[0].cardNumber2}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Name on Card 2"
              name="nameOnCard2"
              initialValue={profile[0].nameOnCard2}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="EXP"
              name="exp2"
              initialValue={profile[0].exp2}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Card Type"
              name="cardType2"
              initialValue={profile[0].cardType2}
            >
              <Select placeholder="Select card type">
                <Option value="AMEX">AMEX</Option>
                <Option value="VISA">VISA</Option>
                <Option value="MASTERCARD">MASTERCARD</Option>
                <Option value="MASTERCARD">DISCOVER</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        {/* )} */}
        {/* {selectedCardType === 'card3' && ( */}
        <div>
          <h4>Card 3</h4>
          <hr />
          <div style={{ marginBottom: '1rem' }}></div>
          <div style={{ marginBottom: '2.5rem' }}>
            <Form.Item
              label="Card 3 Number"
              name="cardNumber3"
              initialValue={profile[0].cardNumber3}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Name on Card 3"
              name="nameOnCard3"
              initialValue={profile[0].nameOnCard3}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="EXP"
              name="exp3"
              initialValue={profile[0].exp3}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Card Type"
              name="cardType3"
              initialValue={profile[0].cardType3}
            >
              <Select placeholder="Select card type">
                <Option value="AMEX">AMEX</Option>
                <Option value="VISA">VISA</Option>
                <Option value="MASTERCARD">MASTERCARD</Option>
                <Option value="MASTERCARD">DISCOVER</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        {/* )} */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Subscribed for Promotions?"
              name="sub"
              valuePropName="checked"
              initialValue={profile[0].isSubscribed}
            >
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>

        <div className='flex justify-end gap-1'>
          <Button title='Cancel' type='button'
            onClick={() => {
              setShowProfileFormModel(false)
              setSelectedProfile(null)
            }}
          />
          <Button title='Save' type='submit' />
        </div>

      </Form>

    </Modal>
  )
}

export default ProfileForm