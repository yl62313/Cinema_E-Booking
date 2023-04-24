import React from "react";
import { Form, message } from "antd";
import Button from "../../../Button";
import { Link, useParams } from "react-router-dom";
import { SetPassword } from "../../../../action/users";

function ResetPassword() {
  const { email } = useParams();
  const onFinish = async (values) => {
    try {
      const response = await SetPassword(email, values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Reset Password</h1>
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <input type="password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <input type="password" />
          </Form.Item>


          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="Change Password" type="submit" />
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

export default ResetPassword;
