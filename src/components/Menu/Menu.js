import React from 'react';
import './Menu.css';
import Login from './LoginButton/LoginButton';
import Filters from './Filters/Filters';

export default props => {
    return (
        <div className='menu-component'>
            <Login />
            <Filters />
            <h2>Menu Component</h2>
            <h2>Menu Component</h2>
            <h2>Menu Component</h2>
        </div>
    );
};
