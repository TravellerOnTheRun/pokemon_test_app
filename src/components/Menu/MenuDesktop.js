import React from 'react';
import './MenuDesktop.css';
import LoginButton from './LoginButton/LoginButton';
import Filters from './Filters/Filters';
import {UserOutlined, StarOutlined} from '@ant-design/icons';

export default props => {
    return (
        <div className='menu-component_desktop'>
            <LoginButton className='login-button_desktop' />
            <Filters
                search={props.filterPokesFn}
                onChangePokes={props.onChangePokes}
            />
            <div className='account-component_desktop'>
                <h2>Account</h2>

                <div className='user_desktop'>
                <UserOutlined className='icon_desktop' />
                <h3>Your name</h3>
                </div>

                <div className='favorites_desktop'>
                <StarOutlined className='icon_desktop' />
                <h3>Your favorites</h3>
                </div>

            </div>
        </div>
    );
};
