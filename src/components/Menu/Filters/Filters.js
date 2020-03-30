import React, { useState, useEffect } from 'react';
import './Filters.css';

import axios from 'axios';

import { Input, Checkbox, Button } from 'antd';
const { Search } = Input;

export default props => {
    const [types, setTypes] = useState([]);
    const [checkedValues, setCheckedValues] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type')
            .then(response => {
                for(const type of response.data.results) {
                    const nameString = type.name;
                    const transformedType = {
                        label: nameString.charAt(0).toUpperCase() + nameString.slice(1),
                        value: nameString
                    };
                    setTypes(prevState => [...prevState, transformedType ]);
                };
            });
    }, []);


    const searchActivateHandler = () => {
        for (const el of checkedValues) {
            if(checkedValues.length > 1) {
                props.onChangePokes(`https://pokeapi.co/api/v2/type/${el}`, true);
            } else {
                props.onChangePokes(`https://pokeapi.co/api/v2/type/${el}`, false);
            };
        };
        setCheckedValues([]);
    };

    const typeChangedHandler = checkedValues => {
        setCheckedValues(checkedValues);        
    };

    const onSearchEnterHandler = value => {
        props.search(value);
    };

    return (
        <div className='filters-component'>
            <Search
                placeholder="Find your pokemon by its name"
                enterButton
                size="large"
                onSearch={onSearchEnterHandler}
                onPressEnter={onSearchEnterHandler}
            />
            <Checkbox.Group options={types} onChange={typeChangedHandler} value={checkedValues}/>
            <Button onClick={searchActivateHandler}>Search by selected tags</Button>
        </div>
    );
};