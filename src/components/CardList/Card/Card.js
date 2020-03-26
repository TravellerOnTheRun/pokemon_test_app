import React from 'react';
import './Card.css';
import image from './../../../images/Pikachu.png';

export default props => {
    return (
        <div className='card-component'>
            <img className='pokemon_picture' src={image} alt='pokemon_picture'/>
            <ul className='card-container'>
                <li>Name</li>
                <li>Type</li>
                {/* <li>Abilities</li>
                <li>Gender Ratio</li>
                <li>Catch Rate</li>
                <li>Shape</li> */}
            </ul>
         </div>
    );
};