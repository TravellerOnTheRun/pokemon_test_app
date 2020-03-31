import React, { useState, useEffect } from 'react';
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <div className='layer-login' onClick={props.dismissLogin}></div>
            <Form
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

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input className='password_input' placeholder="Your password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button className='login_btn' type="primary">Log In</Button>
                </Form.Item>
            </Form>
            <h4 onClick={props.dismissLogin} >Continue without login</h4>
        </div>
    );
};