import React, { useState } from 'react';
import { useStore } from '../../hooks-store/store';
import './Login.css';
import { Form, Input, Button } from 'antd';

import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default props => {
    const dispatch = useStore(false)[1];
    const [isSignup, setIsSignup] = useState(false);

    const onFinish = values => {
        console.log(values);
        if (isSignup) {
            axios.post('http://localhost:8080/signup', values)
                .then(res => {
                    alert(res.message);
                    setIsSignup(false);
                })
                .catch(err => console.log(err));
        } else {
            axios.post('http://localhost:8080/login', values)
                .then(response => {
                    console.log(response.data);
                    const { token, expiresIn, userId, favs, username } = response.data;
                    const expiryDate = new Date(new Date().getTime() + expiresIn);
                    console.log(expiryDate);
                    localStorage.setItem('token', token);
                    localStorage.setItem('expiryDate', expiryDate);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('favs', JSON.stringify(favs));
                    localStorage.setItem('username', username);
                    dispatch('LOGIN', { token, userId, favs, username });
                    props.dismissLogin();
                });
        };
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-component'>
            <Form className='form-inputs'
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {
                    isSignup
                        ? <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className='login_input' placeholder="Your login" />
                        </Form.Item>
                        : null
                }

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input correct email!' }]}
                >
                    <Input className='login_input' placeholder="Your Email" />
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
                                    <Button className='login_btn' type="primary" htmlType="submit">SignUp</Button>
                                    <Button className='login_btn' type="primary" onClick={() => setIsSignup(false)}>Switch to Login</Button>
                                </div>
                            )
                            : (
                                <div>
                                    <Button className='login_btn' type="primary" htmlType="submit" >Log In</Button>
                                    <Button className='login_btn' type="primary" onClick={() => setIsSignup(true)}>Switch to SignUp</Button>
                                </div>
                            )
                    }
                </Form.Item>
            </Form>
            <h4 onClick={props.dismissLogin}>Continue without login</h4>
        </div >
    );
};