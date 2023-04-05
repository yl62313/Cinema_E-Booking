import { Col, Form, message, Modal, Row, Table } from 'antd'
import { useDispatch } from "react-redux";
import React, { useEffect } from 'react'
import { AddShow, DeleteShow, GetAllShows } from '../../../../action/movies';
import Button from '../../../Button';
import {HideLoading, ShowLoading} from "../../../../reducers/loader_reducer"
import moment from "moment";
import { DeleteOutlined} from '@ant-design/icons'


function Shows({ openShowsModal, setOpenShowsModal, movie }) {
    const [view,setView] = React.useState("table");
    const [shows, setShows] = React.useState([]);
    const dispatch = useDispatch();

    const getShowData = async() => {
      try{
        dispatch(ShowLoading());
        const showResponse = await GetAllShows({
          movieId: movie._id,
        })
        if (showResponse.success){
          setShows(showResponse.data);
        }else{
          message.error(showResponse.message)
        }
        dispatch(HideLoading());
      }catch(error){
        message.error(error.message);
        dispatch(HideLoading());
      }
    }
    const putAddShow = async (values) => {
      try{
        dispatch(ShowLoading());
        const response = await AddShow({
          ...values,
          movie: movie._id,
        });
        if(response.success){
          message.success(response.message);
          getShowData();
          setView("table");
        }else{
          message.error(response.message);
        }
        dispatch(HideLoading())
      }catch(error){
        message.error(error.message);
        dispatch(HideLoading());
      }
    }
    const getDelete = async(id) => {
      try {
        dispatch(ShowLoading());
        const response = await DeleteShow({ showId: id });
  
        if (response.success) {
          message.success(response.message);
          getShowData();
        } else {
          message.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        message.error(error.message);
        dispatch(HideLoading());
      }
    }

    const columns = [
        {
          title: "Show Name",
          dataIndex: "name",
        },
        {
          title: "Date",
          dataIndex: "date",
          render: (text, record) => {
            return moment(text).format("MMM Do YYYY");
          },
        },
        {
          title: "Time",
          dataIndex: "time",
        },
        {
          title: "Ticket Price(A)",
          dataIndex: "aticketPrice",
        },
        {
          title: "Ticket Price(C)",
          dataIndex: "cticketPrice",
        },
        {
          title: "Total Seats",
          dataIndex: "totalSeats",
        },
        {
          title: "Available Seats",
          dataIndex: "availableSeats",
          render: (text, record) => {
            return record.totalSeats - record.bookedSeats.length;
          },
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => {
            return (
              <div className="flex gap-1 items-center">
                {record.bookedSeats.length === 0 && (
                  <i>
                    <DeleteOutlined 
                    onClick={()=> {
                      getDelete(record._id);
                      }}/>
                  </i>
                )}
              </div>
            );
          },
        },
      ];

      useEffect(() => {
        getShowData();
      }, []);

  return (
    <Modal 
    title=""
    open={openShowsModal}
    onCancel={()=> setOpenShowsModal(false) }
    width={1000}
    footer={null}
    >
        <h1 className='text-primary text-md uppercase'>
            Movie : {movie.title}
        </h1>
        <hr/>

        <div className='flex justify-between mt-1 mb-1 item-center'>
            <h1 className='text-md'>
                {view === "table" ? "Shows" : "Add Show"}
            </h1>
            { view === "table" && (     
            <Button
            variant="outlined"
            title="Add Show"
            onClick={() => {
                setView("form")
            }}
            />)}
        </div>
        
        {view === "table" && <Table columns={columns} dataSource={shows} />}
        {view === "form" && (
        <Form layout="vertical" onFinish={putAddShow}> 
        <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input show name!" }]}
              >
                <input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input show date!" }]}
              >
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please input show time!" }]}
              >
                <input type="time" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Adult Ticket Price"
                name="aticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Child Ticket Price"
                name="cticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please input total seats!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-1">
            <Button
              variant="outlined"
              title="Cancel"
              onClick={() => {
                setView("table");
              }}
            />
            <Button variant="contained" title="Save" type="submit" />
          </div>

        </Form>
        )}

    </Modal>
  )
}

export default Shows