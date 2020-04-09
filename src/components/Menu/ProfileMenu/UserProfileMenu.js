import React from 'react';
import './UserProfileMenu.css';
import {UserOutlined, StarOutlined} from '@ant-design/icons';

export default props => {
    return (
        <div className='account-component'>
            <h2>Account</h2>

            <div className='user'>
                <UserOutlined className='icon' />
                <h3>Your name</h3>
            </div>

            <div className='favorites'>
                <StarOutlined className='icon' />
                <h3>Your favorites</h3>
            </div>

        </div>
    );
};