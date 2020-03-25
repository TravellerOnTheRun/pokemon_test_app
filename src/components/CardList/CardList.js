import React from 'react';
import './CardList.css';

export default props => {
    return (
        <div className='cardlist-component'>
            <h2>Here are Pokemons!</h2>
            <ul className='cardlist-container'>
                <li>Card</li>
                <li>Card2</li>
                <li>Card3</li>
                <li>Card4</li>
                <li>Card5</li>
                <li>Card6</li>
                <li>Card7</li>
            </ul>
         </div>
    );
};