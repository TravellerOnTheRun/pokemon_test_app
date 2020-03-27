import React from 'react';
import './Filters.css';

import { Input } from 'antd';
const { Search } = Input;

export default props => {

    const onSearchEnterHandler = value => {
        props.search(value);
    };

    return (
        <div className='filters-component'>
            <Search
                placeholder="Find your pokemon by its name"
                enterButton="Search"
                size="large"
                onSearch={onSearchEnterHandler}
            />
        </div>
    );
};