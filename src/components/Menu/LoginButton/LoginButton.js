import React from 'react';
import { useStore } from '../../../hooks-store/store';
import './LoginButton.css';

import { Button } from 'antd';

export default props => {
    const [state, dispatch] = useStore();

    return (
        <div className='login_button-component'>
            {
                state.token
                    ? <Button onClick={() => dispatch('LOGOUT')}>Logout</Button>
                    : <Button onClick={props.openLogin}>SignUp / Login</Button>
            }

        </div>
    );
};