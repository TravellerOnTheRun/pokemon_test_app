import React from 'react';
import './Menu.css';

import Login from './LoginButton/LoginButton';
import Filters from './Filters/Filters';
import UserProfileMenu from './ProfileMenu/UserProfileMenu';

export default props => {
    return (
        <div className='menu-component'>
            <Login />
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
