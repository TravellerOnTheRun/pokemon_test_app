import React, { useState } from 'react';
import './Login.css';
import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default props => {
    const [isSignup, setIsSignup] = useState(false);

    const signupHandler = (email, password) => {
        console.log(email, password);
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-component'>
            {/* <div className='layer-login' onClick={props.dismissLogin}></div> */}
            <Form className='form-inputs'
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className='login_input' placeholder="Your login" />
                </Form.Item>

                <Form.Item className='password_input'
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password className='password_input' placeholder="Your password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    {
                        isSignup
                            ? (
                                <div>
                                    <Button className='login_btn' type="primary">SignUp</Button>
                                    <Button className='login_btn' type="primary" onClick={() => setIsSignup(false)}>Switch to Login</Button>
                                </div>
                            )
                            : (
                                <div>
                                    <Button className='login_btn' type="primary">Log In</Button>
                                    <Button className='login_btn' type="primary"onClick={() => setIsSignup(true)}>Switch to SignUp</Button>
                                </div>
                            )
                    }
                </Form.Item>
            </Form>
            <h4 onClick={props.dismissLogin}>Continue without login</h4>
        </div>
    );
};