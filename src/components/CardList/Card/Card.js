import React, { useState, useCallback } from 'react';
import './Card.css';

import { Button } from 'antd';
import emptystar from './../../../images/emptystar.png';
import goldstar from '../../../images/goldstar.png';


export default props => {
    const [isFavourite, setIsFavourite] = useState(false);

    const switchFavAddFavHandler = useCallback((isFav) => {
        setIsFavourite(isFav);
    }, []);

    return (
        <div className='card-component_closed'>
            <img className='pokemon_picture' src={props.image} alt='pokemon_picture' />
            <ul className='card-container'>
                <li>{props.name.toUpperCase()}</li>
                <li>Type: <div className='wrapping'>{props.types.map(t => <p key={t}>{t}</p>)}</div></li>
                <li>Ability: <div className='wrapping'>{props.abilities.map(a => <p key={a}>{a}</p>)}</div></li>
                <li className='hide-this'>Stats: <div className='wrapping'>{props.stats.map(s => <p key={s}>{s}</p>)}</div></li>
            </ul>
            <Button className='add-to-fav_btn' type="primary" onClick={() => switchFavAddFavHandler(!isFavourite)}>
                <img className='add-to-fav' src={isFavourite ? goldstar : emptystar} alt='pokemon_picture' />
            </Button>
        </div>
    );
};