import React from 'react';
import './CardList.css';
import { v4 as uuidv4 } from 'uuid';

import Card from './Card/Card'; 

export default props => {

    return (
        <div className='cardlist-component'>
            {props.pokemons.map(pokemon => <Card
                key={uuidv4()}
                name={pokemon.name}
                types={pokemon.types}
                abilities={pokemon.abilities}
                stats={pokemon.stats}
                image={pokemon.imageUrl}
            />)}

        </div>
    );
};