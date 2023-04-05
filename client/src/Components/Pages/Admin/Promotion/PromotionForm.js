import React from 'react'
import {Form, Row, Col, message} from "antd"
import Button from '../../../Button';
import { AddPromotion } from '../../../../action/promotion';

function PromotionForm() {
  const onFinish = async(values) => {
    try {
      const response = await AddPromotion(values);
      if (response.success) {
        message.success(response.message); 
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-800">
        <h1 className="text-xl mb-1">ADD PROMOTION</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={8}>
          <Form.Item
            label="Promotion Name"
            name="name"
            rules={[{ required: true, message: "Enter the promotion name" }]}
          >
            <input type="text" />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
            label="Promotion Code"
            name="code"
            rules={[{ required: true, message: "Enter the promotion code" }]}
          >
            <input type="text" />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Enter the promotion's discount" }]}
          >
            <input type="text" />
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Enter the start date" }]}
          >
            <input type="date" />
          </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Enter the end date" }]}
          >
            <input type="date" />
          </Form.Item>
          </Col>
          </Row>
          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="APPLY" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PromotionForm