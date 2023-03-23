import React from 'react'
import {Form, Row, Col, message} from "antd"
import Button from '../../Button'
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../action/users"

function Register() {
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try{
      const response = await RegisterUser(values);
      if(response.success){
        message.success(response.message);
        navigate("/register/thankyou");
      }else{
        message.error(response.message);
      }
    }catch (error){
      message.error(error.message);
    } 
  };

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
          <div className="card p-3 w-800">
            <h1 className="text-xl mb-1">REGISTER</h1>
            <hr />
            <Form layout="vertical" className="mt-1" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Enter your First Name" }]}
              >
                <input type="text" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Enter your Last Name" }]}
              >
                <input type="text" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Enter your Phone Number" }]}
              >
                <input type="tel" />
              </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Enter your Email" }]}
              >
                <input type="email" />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Enter your Password" }]}
              >
                <input type="password" />
              </Form.Item>
              </Col>
              </Row>
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
                <label>
                  <input type="checkbox" />
                  Subscribe for Promotions
                </label>
              </Col>
            </Row>


    
              <div className="flex flex-col mt-2 gap-1">
                <Button fullWidth title="REGISTER" type="submit" />
                <Link to="/login" className="text-primary">
                  {" "}
                  Already have an account? Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      );
    }
    
    export default Register;