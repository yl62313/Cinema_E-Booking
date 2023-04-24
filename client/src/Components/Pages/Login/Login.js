import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../../action/users"

function Login({isLoggedIn, handleLogin, handleIdentify}) {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        handleLogin();
        handleIdentify(values);
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  if (isLoggedIn) {
    navigate("/");
  }
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">LOGIN</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter your email" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="LOGIN" type="submit"/>
            <Link to="/register" className="text-primary">
              {" "}
              Don't have an account? Register
            </Link>
            <Link to="/forgotPassword" className="text-primary">
              {" "}
              Forgot Password? Reset Password
            </Link>
            <Link to="/adminlogin" className="text-primary">
              {" "}
              Are you an admin? Admin Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;