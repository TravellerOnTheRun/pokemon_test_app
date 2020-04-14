import React from 'react';
import { useStore } from '../../../hooks-store/store';

import './UserProfileMenu.css';
import { Button } from 'antd';
import {UserOutlined, StarOutlined} from '@ant-design/icons';

export default props => {
    const[ state, dispatch ]= useStore();

    const sendFavoritesToCardList = favs => {
        console.log(favs);
        let favsArray = [];
        for( const object of favs) {
            console.log(object);
            const transformedFavsObject = {
                _id: object._id.toString(),
                name: object.name,
                imageUrl: object.imageUrl,
                stats: object.stats.split(' '),
                abilities: object.abilities.split(' '),
                types: object.types.split(' ')
            };
            favsArray.push(transformedFavsObject);
        }
        
        dispatch('FILTER_CURRENT_POKEMONS', favsArray);
        dispatch('SET_TOTAL', favs.length);
    };

    return (
        <div className='account-component'>
            <h2>Account</h2>

            <div className='user'>
                <UserOutlined className='icon' />
                <h3>{state.username}</h3>
            </div>

            <div className='favorites'>
                <StarOutlined className='icon' />
                <Button onClick={sendFavoritesToCardList.bind(this, state.favs)}><h3>View Favourites</h3></Button>
            </div>

        </div>
    );
};