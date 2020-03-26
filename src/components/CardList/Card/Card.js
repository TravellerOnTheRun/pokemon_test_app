import React from 'react';
import './Card.css';

export default props => {
    console.log(props);
    return (
        <div className='card-component'>
            <img className='pokemon_picture' src={props.image} alt='pokemon_picture'/>
            <ul className='card-container'>
                <li>{props.name}</li>
                <li>{props.types}</li>
                {/* <li>Abilities</li>
                <li>Gender Ratio</li>
                <li>Catch Rate</li>
                <li>Shape</li> */}
            </ul>
         </div>
    );
};