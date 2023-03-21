import React from "react";
import { Form } from "antd";
import Button from "../../../Button";
import {Link} from "react-router-dom";

function ResetPassword() {

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
      <h1 className="text-xl mb-1">Reset Password</h1>
        <Form layout="vertical" className="mt-1">
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
