import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../Button";
import {Link, useNavigate} from "react-router-dom";
import { AuthUser } from "../../../action/users";

function Auth() {
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      const response = await AuthUser(values);
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href="/";
      }else{
        message.error(response.message)
      }
    }catch (error) {
      message.error(error.message);
    }
  };

  useEffect(()=>{
    if (localStorage.getItem("token")){
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">AUNTHENTICATE USER</h1>
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
            label="Confirmation Code"
            name="password"
            rules={[{ required: true, message: "Enter confirmation code" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="AUTHENTICATE" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Auth;