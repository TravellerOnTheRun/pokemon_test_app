import React from 'react';
import './Card.css';
import image from './../../../images/Pikachu.png';
import { Button } from 'antd';
import icon from './../../../images/emptystar.png';

export default props => {
    return (
        <div className='layer'>
            <div className='card-component_closed-mobile card-component_opened-mobile'>
                <img className='pokemon_picture' src={image} alt='pokemon_picture'/>
                <ul className='card-container'>
                    <li className='first'>Pikachu</li>
                    <li>Type: electric</li>
                    <li>Abilities: lightning-rod/static</li>
                    <li>Species: pikachu</li>
                    <li>Stats: speed/special-defense/special attack</li>
                </ul>
                <Button className='add-to-fav_btn' type="primary">
                    <img className='add-to-fav' src={icon} alt='pokemon_picture'/>
                </Button>
            </div>
        </div>
    );
};