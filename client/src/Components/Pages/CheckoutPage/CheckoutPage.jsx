import React from 'react';
import {useNavigate, Link} from "react-router-dom";
import { Modal, Form, Row, Col, message } from 'antd'
import Button from '../../Button';
import { useDispatch } from 'react-redux';


import './CheckoutPage.css';

// function CheckoutPage() {
 
//   // const onFinish = async(values) => {
//   //   try{
//   //     const response = await RegisterUser(values);
//   //     if(response.success){
//   //       message.success(response.message);
//   //       navigate("/register/thankyou");
//   //     }else{
//   //       message.error(response.message);
//   //     }
//   //   }catch (error){
//   //     message.error(error.message);
//   //   } 
//   // };

function CheckoutPage ({
  showChekoutFormModal,
  setCheckoutFormModal,
  selectedCheckout,
  setSelectedCheckout,
  //getMovieList,
  formType
}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const onFinish = async(values) => {
      
  //      try{
  //     const response = await Checkout(values);
  //     if(response.success){
  //       message.success(response.message);
  //       navigate("/movie/seat/checkout/confirm");
  //     }else{
  //       message.error(response.message);
  //     }
  //   }catch (error){
  //     message.error(error.message);
  //   } 
  // };
      // try{
      //     dispatch(ShowLoading())
      //     let response = null;
      //     if (formType === "add"){
      //         response = await AddMovie(values);
      //     }else{
      //         response = await EditMovie({
      //             ...values,
      //             movieId : selectedMovie._id
      //         });
      //     }
      //     if(response.success){
      //         getMovieList()
      //         message.success(response.message);
      //         setShowMovieFormModal(false);
      //     }
      //     else{
      //         message.error(response.message);
      //     }
      //     dispatch(HideLoading());
      // }catch(error){
      //     dispatch(HideLoading());
      //     message.error(error.message);
      // }
  //}


  const mystyle = {
    width: "750px",
    height: "800px"
  };

  const style = {
    marginright: "auto",
  }


  // onFinish={onFinish}
    return (
        <div className="flex justify-center h-screen items-center bg-primary">
          <div className="card p-3 w-800"  style={mystyle} >
            <h1 className="text-xl mb-1">Checkout</h1>
            <hr />
             {/* <Modal
    // title={formType === "Checkout" ? "Add Movie" : "Edit Movie"}
    open={showCheckoutFormModal}
    // onCancel={()=> { setShowMovieFormModal(false); setSelectedMovie(null);}}
        footer={null}
        width={700}
    >  */}
            <Form layout="vertical" className="mt-1">
            {/* <Col span={16}> */}
            <h5 className="text-l mb-1">Personal Information</h5>
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
             
              {/* </Row> */}
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Enter your Email" }]}
              >
                <input type="email" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                label=" Street Address"
                name="street"
                rules={[{ required: false, message: "Enter your Home Address" }]}
                >
                    <input type="address"/>
              </Form.Item>
              </Col>
              {/* <Row gutter={16}> */}
                <Col span={8}>
                  <Form.Item 
                  label="City"
                  name="city"
                  rules={[{ required: false, message: "Enter your City" }]}
                  >
                    <input type="city"/>
                  </Form.Item>
                </Col>
                </Row>
             <Row gutter={16}>
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
              <div className="flex flex-col mt-2 gap-1">
                <h5 className="text-l mb-1">Billing Information</h5>
                <Row gutter={16}>
                <Col span={8}>  
              <Form.Item
                label="Name on Card"
                name="nameOnCard"
                rules={[{ required: false, message: "Enter your Name on Card" }]}
                >
                    <input type="text"/>
              </Form.Item>
              </Col>
                <Col span={8}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[{ required: false, message: "Enter your Card Number" }]}>
                    <input type="text"/>
              </Form.Item>   
              </Col>
              {/* </Row> */}
              {/* <Row gutter={16}> */}
                <Col span={5}>
                  <Form.Item 
                  label="EXP"
                  name="exp"
                  rules={[{ required: false, message: "Enter your EXP" }]}>
                    <input type="date"/>
                  </Form.Item>
                </Col>
                {/* </Row> */}
                <Col span={3}>
                  <Form.Item 
                  label="CVV"
                  name="cvv"
                  rules={[{ required: false, message: "Enter your 3 digit CVV" }]}>
                    <input type="text"/>
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
              <Col span={8}>
              <Form.Item
                label=" Street"
                name="homeAddress"
                rules={[{ required: false, message: "Enter your Home Address" }]}
                >
                    <input type="address"/>
              </Form.Item>
              </Col>
              {/* <Row gutter={16}> */}
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
                </Row>
                <Row gutter={16}>
                <Col span={6}>
                  <Form.Item 
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: false, message: "Enter your Zip Code" }]}
                  >
                    <input type="zip"/>
                  </Form.Item>
                  </Col>
                  <Col span={6}>
                  <Form.Item 
                  label="Promo Code"
                  name="promoCode"
                  rules={[{ required: false, message: "Enter your Promo Code" }]}
                  >
                    <input type="text"/>
                  </Form.Item>
                  </Col>
                  </Row>
                  <br/>
                
                
                </div>
       <Row gutter={16}>
          <Col span={4}>
              <Button  title="Cancel" type="submit" onClick={navigate("/")} />
              </Col>
              <Button title="Confirm" type="submit" onClick={() => navigate("/movie/seat/checkout/confirm")}/>

        </Row>
            </Form>
         
          </div>
         </div>
      );
    }
    
    export default CheckoutPage;