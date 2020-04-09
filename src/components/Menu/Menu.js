import React from 'react';
import './Menu.css';
import {UserOutlined, StarOutlined} from '@ant-design/icons';

import LoginButton from './LoginButton/LoginButton';
import Filters from './Filters/Filters';
import UserProfileMenu from './ProfileMenu/UserProfileMenu';

export default props => {
    return (
        <div className='menu-component'>
            <LoginButton className='login-button'
                token={props.token}
                logout={props.logout}
                openLogin={props.openLogin}
            />
            <Filters closeMenu={props.closeMenu}/>
            {
                props.showUserProfile
                    ? <UserProfileMenu />
                    : null
            }
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
        </div>
    );
};
