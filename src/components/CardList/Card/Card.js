import React, { useState, useEffect } from 'react';
import './Card.css';

import axios from 'axios';
import { Button } from 'antd';
import emptystar from './../../../images/emptystar.png';
import goldstar from '../../../images/goldstar.png';
import { useStore } from '../../../hooks-store/store';


export default props => {
    const [state, dispatch] = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        if(!state.favs) {
            return;
        };
        for (const fav of state.favs) {
            if (fav.name === props.name) {
                setIsFavourite(true);
            };
        };
    }, [state.favs, props.name])

    const switchFavAddFavHandler = async (isFav) => {
        setIsFavourite(isFav);
        if (isFav) {
            const favouritePokemon = {
                _id: props._id,
                name: props.name,
                types: props.types.join(' '),
                abilities: props.abilities.join(' '),
                stats: props.stats.join(' '),
                imageUrl: props.image
            };
            dispatch('ADD_FAV', favouritePokemon);
            const favs = JSON.parse(localStorage.getItem('favs'));
            favs.push(favouritePokemon);
            localStorage.setItem('favs', JSON.stringify(favs));
            await axios.post(`http://localhost:8080/favourite?token=${state.token}`, favouritePokemon);
            alert(`Now ${props.name} is added to your favourites`);
        } else {
            console.log(`isFav: ${isFav}`);
            // if (!isFavourite) {
            //     return;
            // };
            const favs = JSON.parse(localStorage.getItem('favs')).filter(f => f.name !== props.name);
            localStorage.setItem('favs', JSON.stringify(favs));
            dispatch('REMOVE_FAV', props.name);
            const response = await axios.patch(`http://localhost:8080/favourites?token=${state.token}`, {name: props.name});
            alert(response.data.message);
        };
    };

    let style = 'card-component_closed';
    if (isOpen) {
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