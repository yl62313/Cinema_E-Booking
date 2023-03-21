import React from "react";
import { Form } from "antd";
import Button from "../../../Button";
import {Link} from "react-router-dom";

function ForgotPassword() {

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <Form layout="vertical" className="mt-1">
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
