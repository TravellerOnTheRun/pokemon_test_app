import React from 'react';
import './Card.css';

import { Button } from 'antd';
import icon from './../../../images/emptystar.png';

export default props => {
    console.log(props);
    return (
        <div className='card-component_closed-mobile card-component_opened-mobile'>
            <img className='pokemon_picture' src={props.image} alt='pokemon_picture' />
            <ul className='card-container'>
                <li>{props.name}</li>
                <li>Type: {props.types.map(t => <p>{t.type.name}</p>)}</li>
                <li>Ability: {props.abilities.map(a => <p>{a.ability.name}</p>)}</li>
                <li>Stats: {props.stats.map(s => <p>{s.stat.name}</p>)}</li>
            </ul>
            <Button className='add-to-fav_btn' type="primary">
                <img className='add-to-fav' src={icon} alt='pokemon_picture' />
            </Button>
        </div>
    );
};