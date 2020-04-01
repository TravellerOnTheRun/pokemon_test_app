import React from 'react';
import './LoginButton.css';

import { Button } from 'antd';

export default props => {
    return (
        <div className='login_button-component'>
            {
                props.token
                    ? <Button onClick={props.logout}>Logout</Button>
                    : <Button onClick={props.openLogin}>SignUp / Login</Button>
            }

        </div>
    );
};