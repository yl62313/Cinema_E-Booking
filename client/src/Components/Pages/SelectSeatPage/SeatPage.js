import React, { useEffect, useState } from 'react'
import MovieIcon from '../../../samplePicture/pngegg.png'
import ScreenIcon from '../../../samplePicture/2169727.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from "../../../reducers/loader_reducer"
import { BringShowById } from "../../../action/movies"
import { message } from "antd"

function SeatPage({ isLoggedIn }) {
  const [show, setShow] = React.useState(null)
  const [selectedSeat, setSelectedSeat] = React.useState([])
  const [childTickets, setChildTickets] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [seniorPrice, setSeniorPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const getSeatsData = () => {
    const columns = 15
    const seats = show.totalSeats
    const rows = Math.ceil(seats / columns);
    return (
      <div className="columnSeat">
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex justify-center gap-2">
              {Array.from(Array(columns).keys()).map((column, index) => {
                let seatClass = "totalSeats";
                if (selectedSeat.includes(seat * columns + column + 1)) {
                  seatClass = "selectedSeats";
                  localStorage.setItem('selectedSeat', JSON.stringify(selectedSeat));
                }
                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = "bookedSeats";
                }
                return (
                  seat * columns + column + 1 <= seats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        const seatNumber = seat * columns + column + 1;
                        if (selectedSeat.includes(seatNumber)) {
                          setSelectedSeat(selectedSeat.filter((item) => item !== seatNumber));
                        } else {
                          setSelectedSeat([...selectedSeat, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm"> {seat * columns + column + 1}</h1>
                    </div>

                  )
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  let totalTickets;
  let orderedTickets;
  const OrderSummaryPage = ({ }) => {
    totalTickets = childTickets + adultTickets + seniorTickets;
    orderedTickets = selectedSeat.length;



    useEffect(() => {
      const ticketPrice = childPrice + adultPrice + seniorPrice;
      const totalPrice = ticketPrice + (ticketPrice * 0.05) + (ticketPrice * 0.02);
      setTotalPrice(totalPrice);
      localStorage.setItem('totalPrice', totalPrice);
    }, [childPrice, adultPrice, seniorPrice]);

    const incrementChildTickets = () => {
      setChildTickets(childTickets + 1);
      setChildPrice((childTickets + 1) * show.childPrice);
    };
    const decrementChildTickets = () => {
      if (childTickets > 0) {
        setChildTickets(childTickets - 1);
        setChildPrice((childTickets - 1) * show.childPrice);
      }
    };
    const incrementAdultTickets = () => {
      setAdultTickets(adultTickets + 1);
      setAdultPrice((adultTickets + 1) * show.adultPrice);
    };
    const decrementAdultTickets = () => {
      if (adultTickets > 0) {
        setAdultTickets(adultTickets - 1);
        setAdultPrice((adultTickets - 1) * show.adultPrice);
      }
    };
    const incrementSeniorTickets = () => {
      setSeniorTickets(seniorTickets + 1);
      setSeniorPrice((seniorTickets + 1) * show.seniorPrice);
    };
    const decrementSeniorTickets = () => {
      if (seniorTickets > 0) {
        setSeniorTickets(seniorTickets - 1);
        setSeniorPrice((seniorTickets - 1) * show.seniorPrice);
      }
    };
    function currencyFormat(num) {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
      <div>
        <div className="summaryContainer">
          <div className="ticket-type-col summaryH3">
            <h4>TICKET TYPE:</h4>
            <div>Child:</div>
            <div>Adult:</div>
            <div>Senior:</div>
          </div>

          <div className="quantity-col summaryH3">
            <h4>QUANTITY:</h4>

            <div className="quantity-button buttonPadding">
              <button onClick={decrementChildTickets}>-</button>
              <div>{childTickets || '0'}</div>
              <button onClick={incrementChildTickets}>+</button>
            </div>

            <div className="quantity-button buttonPadding">
              <button onClick={decrementAdultTickets}>-</button>
              <div>{adultTickets || '0'}</div>
              <button onClick={incrementAdultTickets}>+</button>
            </div>

            <div className="quantity-button buttonPadding">
              <button onClick={decrementSeniorTickets}>-</button>
              <div>{seniorTickets || '0'}</div>
              <button onClick={incrementSeniorTickets}>+</button>
            </div>

          </div>

          <div className="price-col summaryH3">
            <h4>PRICE:</h4>
            <div>{currencyFormat(childPrice) || '$0.00'}</div>
            <div>{currencyFormat(adultPrice) || '$0.00'}</div>
            <div>{currencyFormat(seniorPrice) || '$0.00'}</div>
            <h4>Total: {currencyFormat(totalPrice) || '$0.00'}</h4>
          </div>
        </div>
      </div>
    )
  }


  useEffect(() => {
    getShowData();
  }, []);


  return (
    show && (
      <div>
        {/* show info */}
        <div className="flex justify-between card p-2">
          <div>
            <h1 className='movieLetter uppercase cursor-pointer' onClick={() => { navigate("/") }}>
              <img src={MovieIcon} alt="" height={30} />{show.movie.title}
            </h1>
          </div>
          <div>
            <h1 className='movieTime uppercase'>{show.time}
            </h1>
          </div>
        </div>
        <div className="screenIcon"><img src={ScreenIcon} alt="" width={120} /></div>

        <div className="seatBackground">{getSeatsData()}</div>

        <div className='pb-3'>
          <OrderSummaryPage />
        </div>

        {selectedSeat.length > 0 && (
          <div>
            <h1 className='letterLetter pb-2 text-md'><b>Selected Seats</b> : {selectedSeat.join(" , ")}</h1>
          </div>
        )}

        <div className='flex justify-center gap-1'>
          <div className='cancelCart'>
            <h1 className=' loginLetter cursor-pointer' onClick={() => { navigate("/") }}>
              {"CANCEL"}
            </h1>
          </div>
          {selectedSeat.length > 0 && (
            <div className='addCart'>
              {selectedSeat.length === childTickets + adultTickets + seniorTickets ? (
                <Link to={{
                  pathname: `/checkout/${show._id}`,
                  state: {
                    selectedSeat: localStorage.getItem('selectedSeat', JSON.stringify(selectedSeat)),
                    totalPrice: localStorage.getItem('totalPrice')
                  }
                }} className='loginLetter cursor-pointer'>
                  {"CHECK OUT"}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>

    ))
}

export default SeatPage