import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../Button";
import { Link, useNavigate } from "react-router-dom";
import { AdminLoginUser } from "../../../action/users"

function AdminLogin() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await AdminLoginUser(values);
            if (response.success) {
                message.success(response.message);
                navigate("/Admin");
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <div className="card p-3 w-400">
                <h1 className="text-xl mb-1">ADMIN LOGIN</h1>
                <hr />
                <Form layout="vertical" className="mt-1" onFinish={onFinish}>
                    <Form.Item
                        label="AdminID"
                        name="id"
                        rules={[{ required: true, message: "Enter your AdminID" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Enter your password" }]}
                    >
                        <input type="password" />
                    </Form.Item>

                    <div className="flex flex-col mt-2 gap-1">
                        <Button fullWidth title="LOGIN" type="submit" />
                        <Link to="/register" className="text-primary">
                            {" "}
                            Don't have an account? Register
                        </Link>
                        <Link to="/forgotPassword" className="text-primary">
                            {" "}
                            Forgot Password? Reset Password
                        </Link>
                        <Link to="/login" className="text-primary">
                            {" "}
                            Not an Admin? Regular user Login
                        </Link>

                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AdminLogin;