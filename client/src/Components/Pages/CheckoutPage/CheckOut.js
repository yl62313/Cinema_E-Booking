
import { Col, Form, message, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckOutTickets, MakePayment } from '../../../action/checkout';
import { BringShowById } from '../../../action/movies';
import { BringPromotion } from '../../../action/promotion';
import { HideLoading, ShowLoading } from '../../../reducers/loader_reducer';
import { AddTicket } from "../../../action/ticket"
import Button from "../../Button";


function CheckOut() {
  
  const [show, setShow] = React.useState(null)
  const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
  const [totalPrice, setTotalPrice] = React.useState(localStorage.getItem('totalPrice'));
  const [promoCode, setPromoCode] = React.useState([]);
  const [promoValue, setPromoValue] = React.useState('');
  const [cardType, setCardType] = React.useState('');

  const { Option } = Select;
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      // const seatNumbers = selectedSeat.join(" , ");
      const payload = {
        seats: selectedSeat,
        totalPrice: totalPrice,
        ...values
      };
  
      const response = await CheckOutTickets(payload);
  
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };


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

  // const checkout = async (transactionId) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await CheckOutselectedSeat({
  //       show: params.id,
  //       seats: selectedSeat,
  //       transactionId,
  //     });
  //     if (response.success) {
  //       message.success(response.message);
  //     } else {
  //       message.error(response.message);
  //     }
  //     dispatch(HideLoading())
  //   } catch (error) {
  //     message.error(error.message)
  //     dispatch(HideLoading())
  //   }
  // }

  // const payment = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await MakePayment(
  //       totalPrice
  //     );
  //     if (response.success) {
  //       message.success(response.message);
  //       checkout(response.data);
  //     } else {
  //       message.error(response.message);
  //     }
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     message.error(error.message);
  //     dispatch(HideLoading());
  //   }
  // };


  const applyPromoCode = async () => {
    try {
      dispatch(ShowLoading());
      const response = await BringPromotion()
      if (response.success) {
        setPromoCode(response.data);
      } else {
        message.error(response.message)
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  }
  
  const handleApplyPromo = () => {
    const promo = promoCode.find((promo) => promo.code === promoValue);
    if (promo) {
      setTotalPrice((prevPrice) => Number((prevPrice * (1 - promo.discount / 100)).toFixed(2)));
      setPromoCode([promo]);
      setPromoValue('');
      message.success('Promo code applied successfully');
    } else {
      message.error('Invalid promo code');
    }
  };

  const handleCardTypeChange = (value) => {
    setCardType(value);
  };


  useEffect(() => {
    getShowData();
    applyPromoCode();
  }, []);

  return (

  //   <Form layout="vertical" className="mt-1" onFinish={onFinish}>
  //   <Col span={5} className="flex flex-col mt-3">
  //     <Button htmlType="submit" fullWidth title="PAY NOW" />
  //   </Col>
  // </Form>
    show && <div className="flex justify-center hc-screen items-center bg-primary">
      <div className="card p-3 w-50">
        <h1 className="movieLetter mb-1 flex justify-center">Check Out</h1>
        <br />
        <div className='flex justify-center'>
          <div className="cardc p-2">
            <p className="cletterLetter uppercase">Movie: {show.movie.title} </p>
            <p className="cletterLetter">TIME: {show.time} </p>
            <p className="cletterLetter">SELECTED SEATS: {selectedSeat.join(" , ")}</p>
            <p className="cletterLetter">TOTAL PRICE: ${totalPrice}</p>
            <br />
            <div className="aletterLetter underline">
              <Link to={`/seat/${show._id}`}>Edit Seat</Link>
            </div>
          </div>
        </div>

        <br />

        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
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
              <Button fullWidth title="APPLY" onClick={handleApplyPromo} />
            </Col>
          </Row>
          <br />
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
                  <input type="text" />
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
                  <input type="text" />
                </Form.Item>
              </Col>
              {/* </Row> */}
              {/* <Row gutter={16}> */}
              <Col span={5}>
                <Form.Item
                  label="EXP"
                  name="exp"
                  rules={[{ required: false, message: "Enter your EXP" }]}>
                  <input type="date" />
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
                  <input type="text" />
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
                  <input type="address" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: false, message: "Enter your City" }]}
                >
                  <input type="city" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: false, message: "Enter your State" }]}
                >
                  <input type="state" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: false, message: "Enter your Zip Code" }]}
                >
                  <input type="zip" />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row gutter={16} className="flex justify-center">
              <Col span={5} className="flex flex-col mt-3">
                <Button fullWidth title="CANCEL" onClick={() => { navigate("/") }} />
              </Col>
              <Col span={5} className="flex flex-col mt-3">
                <Button fullWidth title="PAY NOW" type="submit" />
              </Col>
            </Row>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default CheckOut