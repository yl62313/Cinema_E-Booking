import { Col, Form, message, Modal, Row, Table } from 'antd'
import { useDispatch } from "react-redux";
import React, { useEffect } from 'react'
import { AddShow, DeleteShow, GetAllShows } from '../../../../action/movies';
import Button from '../../../Button';
import { HideLoading, ShowLoading } from "../../../../reducers/loader_reducer"
import moment from "moment";
import { DeleteOutlined } from '@ant-design/icons'


function Shows({ openShowsModal, setOpenShowsModal, movie }) {
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);
  const dispatch = useDispatch();

  const getShowData = async () => {
    try {
      dispatch(ShowLoading());
      const showResponse = await GetAllShows({
        movieId: movie._id,
      })
      if (showResponse.success) {
        setShows(showResponse.data);
      } else {
        message.error(showResponse.message)
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  }


  const putAddShow = async (values) => {
    try {
      dispatch(ShowLoading());

      // Check for duplicates based on date and time
      const duplicateShow = shows.find(show => (
        moment(show.date).isSame(values.date, 'day') && show.time === values.time
      ));
      if (duplicateShow) {
        message.error("A show already exists at this date and time.");
        dispatch(HideLoading());
        return;
      }
      //////

      const response = await AddShow({
        ...values,
        movie: movie._id,
        date: moment(values.date).toISOString(),////
      });
      if (response.success) {
        message.success(response.message);
        getShowData();
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading())
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  }


  const getDelete = async (id) => {
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
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 items-center">
              <i><DeleteOutlined
                onClick={() => {
                  getDelete(record._id);
                }} />
              </i>
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
      onCancel={() => setOpenShowsModal(false)}
      width={1000}
      footer={null}
    >
      <h1 className='text-primary text-md uppercase'>
        Movie : {movie.title}
      </h1>
      <hr />

      <div className='flex justify-between mt-1 mb-1 item-center'>
        <h1 className='text-md'>
          {view === "table" ? "Shows" : "Add Show"}
        </h1>
        {view === "table" && (
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