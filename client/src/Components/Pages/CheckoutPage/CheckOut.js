import { Col, Form, message, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckOutTickets } from '../../../action/checkout';
import { BringShowById } from '../../../action/movies';
import { BringPromotion, BringPromotionList } from '../../../action/promotion';
import { HideLoading, ShowLoading } from '../../../reducers/loader_reducer';
import Button from "../../Button";
import { v4 as uuidv4 } from 'uuid';
import { BringProfileList, BringUserById } from '../../../action/users';


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
  const [cardList, setCardList] = useState([]);
  const { Option } = Select;
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

  const getCardList = async () => {
    try {
      dispatch(ShowLoading())
      const response = await BringProfileList(props.user.email);
      if (response.success) {
        setCardList([response.data]);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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


  const checkout = async () => {
    const transactionId = uuidv4();
    setTransactionId(transactionId);
    try {
      dispatch(ShowLoading());
      const response = await CheckOutTickets({
        show: params.id,
        user: profile,
        seats: selectedSeat,
        totalPrice: totalPrice,
        transactionId,
      });
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('show', JSON.stringify(show));
        localStorage.setItem('selectedSeat', JSON.stringify(selectedSeat));
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('transactionId', transactionId);
        navigate(`/ordered/${response.data._id}`)
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading())
    } catch (error) {
      message.error(error.message)
      dispatch(HideLoading())
    }
  }

  const [selectedCardType, setSelectedCardType] = useState(null);

  const handleCardTypeChange = (value) => {
    setSelectedCardType(value);

  };


  useEffect(() => {
    getCardList();
    getShowData();
    applyPromoCode();
    getProfileList();
  }, []);

  const columns = [
    {
      title: "Payment options",
      render: (text, record) => {
        return (
          <div className='mb-2'>
            <h5 className="text-l mb-1">Select Saved Cards</h5>
            <Select onChange={handleCardTypeChange} className="w-1" defaultValue={selectedCardType || ""} required>
              <Option disabled selected value="">Select Card</Option>
              {record.nameOnCard1 !== "" && record.exp1 !== "" && <Option value="card1">{record.nameOnCard1}, {record.exp1}</Option>}
              {record.nameOnCard2 !== "" && record.exp2 !== "" && <Option value="card2">{record.nameOnCard2}, {record.exp2}</Option>}
              {record.nameOnCard3 !== "" && record.exp3 !== "" && <Option value="card3">{record.nameOnCard3}, {record.exp3}</Option>}
              <Option value="newCard">Pay with new card</Option>
            </Select>
            {selectedCardType === 'card1' && (
              <div>
                <div style={{ marginBottom: '2.5rem' }}></div>
                <div style={{ marginBottom: '1rem' }}></div>
                <div style={{ marginBottom: '2.5rem' }}>

                  <Form.Item
                    label="CVV"
                    name="cvv"
                  >
                    <input type="text" style={{ width: '100px' }} />
                  </Form.Item>
                </div>
              </div>
            )}
            {selectedCardType === 'card2' && (
              <div>
                <div style={{ marginBottom: '2.5rem' }}></div>
                <div style={{ marginBottom: '1rem' }}></div>
                <div style={{ marginBottom: '2.5rem' }}>

                  <Form.Item
                    label="CVV"
                    name="cvv"
                  >
                    <input type="text" style={{ width: '100px' }} />
                  </Form.Item>
                </div>
              </div>
            )}
            {selectedCardType === 'card3' && (
              <div>
                <div style={{ marginBottom: '2.5rem' }}></div>
                <div style={{ marginBottom: '1rem' }}></div>
                <div style={{ marginBottom: '2.5rem' }}>

                  <Form.Item
                    label="CVV"
                    name="cvv"
                  >
                    <input type="text" style={{ width: '100px' }} />
                  </Form.Item>
                </div>
              </div>
            )}
            {selectedCardType === 'newCard' && (
              <div>
                <div style={{ marginBottom: '2.5rem' }}></div>
                <h4>Pay with new card</h4>
                <hr />
                <div style={{ marginBottom: '1rem' }}></div>
                <div style={{ marginBottom: '2.5rem' }}>
                  <Form.Item
                    label="Card Number"
                    name="cardNumber"
                  >
                    <input type="text" style={{ width: '300px' }} />
                  </Form.Item>
                  <Form.Item
                    label="Name on Card"
                    name="nameOnCard"
                  >
                    <input type="text" style={{ width: '300   px' }} />
                  </Form.Item>
                  <Form.Item
                    label="EXP"
                    name="exp"
                  >
                    <input type="text" style={{ width: '100px' }} />
                  </Form.Item>
                  <Form.Item
                    label="CVV"
                    name="cvv"
                  >
                    <input type="text" style={{ width: '100px' }} />
                  </Form.Item>
                </div>
              </div>
            )}
          </div>

        );
      },
    },
  ];

  return (
    show &&
    <div className="flex justify-center hc-screen items-center bg-checkout">
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
              <Button fullWidth title="APPLY" onClick={handleApplyPromo} />
            </Col>
          </Row>
          <br />

          <Table columns={columns} dataSource={cardList} />







          <div className="flex flex-col mt-2 gap-1">

            <br />
            <Row gutter={16} className="flex justify-center">
              <Col span={5} className="flex flex-col mt-3">
                <Button fullWidth title="CANCEL" onClick={() => { navigate("/") }} />
              </Col>
              <Col span={5} className="flex flex-col mt-3">
                <Button fullWidth title="PAY NOW" type="submit" onClick={() => checkout(transactionId)} />
              </Col>
            </Row>
          </div>
        </Form>

      </div>
    </div>
  )
}
export default CheckOut