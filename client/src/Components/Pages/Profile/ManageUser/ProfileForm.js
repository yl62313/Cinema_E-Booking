import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { EditProfile } from "../../../../action/users"
import { Modal, Form, Row, Col, message } from 'antd'
import Button from '../../../../Components/Button'
import { Checkbox } from 'antd';

function ProfileForm({
  showProfileFormModel,
  setShowProfileFormModel,
  setSelectedProfile,
  formType,
  user,
  profile
}) {
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
          <input type='password'/>
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Card Number"
              name="cardNumber"
              initialValue={profile[0].cardNumber}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Name on Card"
              name="nameOnCard"
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="EXP"
              name="exp"
              initialValue={profile[0].EXP}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Subscribed for Promotions?"
              name="sub"
              valuePropName="checked"
              initialValue={profile[0].isSubscribed}
            >
              <Checkbox/>
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