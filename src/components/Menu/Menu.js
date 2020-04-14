import React from 'react';
import './Menu.css';

import LoginButton from './LoginButton/LoginButton';
import Filters from './Filters/Filters';
import UserProfileMenu from './ProfileMenu/UserProfileMenu';

export default props => {
    let styleVisible = '';
    if (props.isShown === false) {
        styleVisible = 'invisible';
    };
    return (
        <div className={styleVisible}>
            {
                props.style === 'menu-component_desktop'
                    ? null
                    : <div className='backdrop' onClick={props.closeMenu}></div>
            }
            <div className={props.style}>
                <LoginButton className='login-button'
                    openLogin={props.openLogin}
                />
                <Filters closeMenu={props.closeMenu} />
                {
                    props.showUserProfile
                        ? <UserProfileMenu />
                        : null
                }
            </div>
        </div>

    );
};
