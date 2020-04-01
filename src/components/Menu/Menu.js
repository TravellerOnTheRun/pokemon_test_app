import React from 'react';
import './Menu.css';

import LoginButton from './LoginButton/LoginButton';
import Filters from './Filters/Filters';
import UserProfileMenu from './ProfileMenu/UserProfileMenu';

export default props => {
    return (
        <div className='menu-component'>
            <LoginButton
                token={props.token}
                logout={props.logout}
                openLogin={props.openLogin}
            />
            <Filters
                search={props.filterPokesFn}
                onChangePokes={props.onChangePokes}
            />
            {
                props.showUserProfile
                    ? <UserProfileMenu />
                    : null
            }
        </div>
    );
};
