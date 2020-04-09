import React, { useState, useCallback } from 'react';
import './Card.css';

import axios from 'axios';
import { Button } from 'antd';
import emptystar from './../../../images/emptystar.png';
import goldstar from '../../../images/goldstar.png';


export default props => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    const switchFavAddFavHandler = async(isFav) => {
        setIsFavourite(isFav);
        const favouritePokemon = {
            name: props.name,
            types: props.types,
            abilities: props.abilities,
            stats: props.stats,
            imageUrl: props.image
        };
        await axios.post('http://localhost:8080/favourite', favouritePokemon);
        alert(`Now ${props.name} is added to your favourites`);
    };

    let style = 'card-component_closed';
    if(isOpen) {
        style = 'card-component_opened';
    };

    return (
        <div className={style} onClick={() => setIsOpen(prevState => !prevState)}>
            <img className='pokemon_picture' src={props.image} alt='pokemon_picture' />  
            <ul className='card-container'>
                <li>{props.name.toUpperCase()}</li>
                <li>Type: <div className='wrapping'>{props.types.map(t => <p key={t}>{t}</p>)}</div></li>
                <li>Abilities: <div className='wrapping'>{props.abilities.map(a => <p key={a}>{a}</p>)}</div></li>
                <li className='hide-this'>Stats: <div className='wrapping'>{props.stats.map(s => <p key={s}>{s}</p>)}</div></li>
            </ul>
            <Button className='add-to-fav_btn' type="primary" onClick={() => switchFavAddFavHandler(!isFavourite)}>
                <img className='add-to-fav' src={isFavourite ? goldstar : emptystar} alt='pokemon_picture' />
            </Button>
        </div>
    );
};