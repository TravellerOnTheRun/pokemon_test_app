import React from 'react';
import './Login.css';
import { Input, Button } from 'antd';

export default props => {
    return (
        <div className='layer-login' onClick={props.dismissLogin}>
            <div className='login-component'>
                <Input className='login_input' placeholder="Your login" />
                <Input className='password_input' placeholder="Your password" />
                <Button className='login_btn' type="primary">Log In</Button>
                <h4>Continue without login</h4>
            </div>
        </div>
    );
};