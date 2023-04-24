import { Col, Form, message, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckOutTickets } from '../../../action/checkout';
import { BringShowById } from '../../../action/movies';
import { BringPromotion} from '../../../action/promotion';
import { HideLoading, ShowLoading } from '../../../reducers/loader_reducer';
import Button from "../../Button";
import { v4 as uuidv4 } from 'uuid';
import { BringProfileList } from '../../../action/users';


function CheckOut(props) {

  console.log("userEmail:", props.user);

    const [show, setShow] = React.useState(null)
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
    const [totalPrice, setTotalPrice] = React.useState(localStorage.getItem('totalPrice'));
    const [promoCode, setPromoCode] = React.useState([]);
    const [promoValue, setPromoValue] = React.useState('');
    const [cardType, setCardType] = React.useState('');
    const [transactionId, setTransactionId] = React.useState("");
    const [profile, setProfile] = useState([]);
    const {Option} = Select;
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const getShowData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await BringShowById({
            showId: params.id,
          })
          if (response.success) {
            setShow(response.data);
          } else {
            message.error(response.message)
          }
          dispatch(HideLoading());
        } catch (error) {
          message.error(error.message);
          dispatch(HideLoading());
        }
    }

    const getProfileList = async () => {
      try {
        dispatch(ShowLoading())
        const response = await BringProfileList(props.user.email);
        if (response.success) {
          const profileData = {
            key: response.data._id,
            fullName: `${response.data.firstName} ${response.data.lastName}`,
            phoneNumber: response.data.phoneNumber,
            address: `${response.data.street} ${response.data.city}, ${response.data.state} ${response.data.zipCode}`,
            action: "",
          };
          setProfile(response.data._id.toString());
        } else {
          message.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };


    const applyPromoCode = async() => {
      try{
          dispatch(ShowLoading());
          const response = await BringPromotion()
          if (response.success){
              setPromoCode(response.data);
          }else{
              message.error(response.message)
          }
          dispatch(HideLoading());
      }catch(error){
          message.error(error.message);
          dispatch(HideLoading());
      }
    }
    const handleApplyPromo = () => {
      const promo = promoCode.find((promo) => promo.code === promoValue);
      if (promo) {
          setTotalPrice((prevPrice) => Number((prevPrice * (1 - promo.discount/100)).toFixed(2)));
          setPromoCode([promo]);
          setPromoValue('');
          message.success('Promo code applied successfully');
      }else {
        message.error('Invalid promo code');
      }
    };


    const checkout = async() => {
      const transactionId = uuidv4();
      setTransactionId(transactionId);
      try {
        dispatch(ShowLoading());
        const response = await CheckOutTickets({
          show:params.id,
          user:profile,
          seats:selectedSeat,
          totalPrice: totalPrice,
          transactionId,
        });
        if(response.success){
          message.success(response.message);
          localStorage.setItem('show', JSON.stringify(show));
          localStorage.setItem('selectedSeat', JSON.stringify(selectedSeat));
          localStorage.setItem('totalPrice', totalPrice);
          localStorage.setItem('transactionId', transactionId);
          navigate(`/ordered/${response.data._id}`)
        }else{
          message.error(response.message);
        }
        dispatch(HideLoading())
      }catch(error){
        message.error(error.message)
        dispatch(HideLoading())
      }
    }
    


      const handleCardTypeChange = (value) => {
        setCardType(value);
      };


      useEffect(()=> {
        getShowData();
        applyPromoCode();
        getProfileList();
      },[]);

  return (
    show &&
      <div className="flex justify-center hc-screen items-center bg-checkout">
        <div className="card p-3 w-50">
        <h1 className="movieLetter mb-1 flex justify-center">Check Out</h1>
        <br/>
        <div className='flex justify-center'>
        <div className="cardc p-2">
        <p className="cletterLetter uppercase">Movie: {show.movie.title} </p>
        <p className="cletterLetter">TIME: {show.time} </p>
        <p className="cletterLetter">SELECTED SEATS: {selectedSeat.join(" , ")}</p>
        <p className="cletterLetter">TOTAL PRICE: ${totalPrice}</p>
        <br/>
        <div className="aletterLetter underline">
        <Link to={`/seat/${show._id}`}>Edit Seat</Link>
        </div>
        </div>
        </div>

        <br/>
       
        <Form layout="vertical" className="mt-1">
            <Row gutter={16} className="flex justify-center">
                <Col span={6}>
                <Form.Item label="Promo Code">
                    <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoValue}
                        onChange={(e) => setPromoValue(e.target.value)}
                    />
                </Form.Item>
                </Col>
                <Col span={2} className="flex flex-col mt-3">
                <Button fullWidth title="APPLY" onClick={handleApplyPromo}/>
                </Col>
            </Row>
            <br/>
            <h5 className="text-l mb-1">Personal Information</h5>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: false, message: "Enter your First Name" }]}
                    >
                    <input type="text" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: false, message: "Enter your Last Name" }]}
                    >
                    <input type="text" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: false, message: "Enter your Phone Number" }]}
                    >
                    <input type="tel" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: false, message: "Enter your Email" }]}
                    >
                    <input type="email" />
                    </Form.Item>
                </Col>
            </Row>
            <div className="flex flex-col mt-2 gap-1">
            <h5 className="text-l mb-1">Card Information</h5>
            <Select onChange={handleCardTypeChange} className="w-1" defaultValue="Card Type">
                <Option value="MasterCard">MasterCard</Option>
                <Option value="Visa">Visa</Option>
                <Option value="AMEX">AMEX</Option>
            </Select>
            <Row gutter={16}>
                <Col span={6}>  
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
            rules={[
                { required: false, message: "Enter your Card Number" },
                {/*({getFieldValue}) => ({
                    validator(_, value) {
                        if (cardType === 'MasterCard' && value && value.length === 16) {
                            return Promise.resolve();
                        }
                        if (cardType === 'Visa' && value && value.length === 16) {
                            return Promise.resolve();
                        }
                        if (cardType === 'AMEX' && value && value.length === 15) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(`Invalid ${cardType} card number`));
                        }
                    })*/}
                ]}
                >
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
                    <input type="text"/>
                  </Form.Item>
                </Col>
                {/* </Row> */}
                <Col span={5}>
                <Form.Item 
            label="CVV"
            name="cvv"
            rules={[
                { required: false, message: "Enter your 3 digit CVV" },
                {/*({getFieldValue}) => ({
                    validator(_, value) {
                        if (cardType === 'MasterCard' && value && value.length === 3) {
                            return Promise.resolve();
                        }
                        if (cardType === 'Visa' && value && value.length === 3) {
                            return Promise.resolve();
                        }
                        if (cardType === 'AMEX' && value && value.length === 4) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(`Invalid ${cardType} CVV`));
                        }
                    })*/}
                ]}
                >
                    <input type="text"/>
                </Form.Item>
              </Col>
            </Row>
            </div>
            <div className="flex flex-col mt-2 gap-1">
            <h5 className="text-l mb-1">Billing Information</h5>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                    label=" Street Address"
                    name="street"
                    rules={[{ required: false, message: "Enter your Home Address" }]}
                >
                    <input type="address"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                    label="City"
                    name="city"
                    rules={[{ required: false, message: "Enter your City" }]}
                    >
                    <input type="city"/>
                </Form.Item>
              </Col>
                <Col span={6}>
                  <Form.Item 
                  label="State"
                  name="state"
                  rules={[{ required: false, message: "Enter your State" }]}
                  >
                    <input type="state"/>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item 
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: false, message: "Enter your Zip Code" }]}
                  >
                    <input type="zip"/>
                  </Form.Item>
                </Col>
            </Row>
            <br/>
            <Row gutter={16} className="flex justify-center">
            <Col span={5} className="flex flex-col mt-3">
            <Button fullWidth title="CANCEL" onClick={() => { navigate("/") }}/>
            </Col>
            <Col span={5} className="flex flex-col mt-3">
            <Button fullWidth title="PAY NOW" type="submit" onClick={()=> checkout(transactionId)}/>
            </Col>
            </Row>
            </div>
        </Form>

        </div>
    </div>
  )
}
export default CheckOut