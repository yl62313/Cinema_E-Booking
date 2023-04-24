import React from "react";
import { Form, message } from "antd";
import Button from "../../../Button";
import { Link } from "react-router-dom";
import { SendEmail } from "../../../../action/users";

function ForgotPassword() {
  const onFinish = async(values) => {
    try {
      const response = await SendEmail(values);
      if(response.success){
        message.success(response.message);
      } else message.error(response.message);
    } catch (error) {
      message.error(error.message);
    }
  }
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter your email" }]}
          >
            <input type="email" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="Reset Password" type="submit" />
            <Link to="/" className="text-primary">
              {" "}
              Don't need to reset? Exit
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
