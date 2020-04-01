import React from 'react';
import './Card.css';

import { Button, Card } from 'antd';
import icon from './../../../images/emptystar.png';

export default props => {
    return (
        <div className='card-component_closed'>
            <img className='pokemon_picture' src={props.image} alt='pokemon_picture' />  
            <ul className='card-container'>
                <li>{props.name.toUpperCase()}</li>
                <li>Type: <div className='wrapping'>{props.types.map(t => <p key={t.type.name}>{t.type.name}</p>)}</div></li>
                <li>Ability: <div className='wrapping'>{props.abilities.map(a => <p key={a.ability.name}>{a.ability.name}</p>)}</div></li>
                <li className='hide-this'>Stats: <div className='wrapping'>{props.stats.map(s => <p key={s.stat.name}>{s.stat.name}</p>)}</div></li>
            </ul>
            <Button className='add-to-fav_btn' type="primary">
                <img className='add-to-fav' src={icon} alt='pokemon_picture' />
            </Button>
        </div>
    );
};