import React from 'react';
import './Input.css';
import { Input, Button } from 'antd';

export default props => {
    return (
        <div className='input-component'>
           <Input className='input_field' placeholder='Pokemon Type' />
           <Input className='input_field' placeholder='Pokemon Abilities' />
           <Input className='input_field' placeholder='Pokemon Gender Ratio' />
           <Input className='input_field' placeholder='Pokemon Shape' />
           <Button className='input_btn' type="primary">Search</Button>
        </div>
    );
};