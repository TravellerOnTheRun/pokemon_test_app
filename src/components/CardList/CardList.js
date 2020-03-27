import React, { useEffect, useState, useContext } from 'react';
import './CardList.css';

import Card from './Card/Card'; 

export default props => {
    // const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='cardlist-component'>
            {props.pokemons.map(pokemon => <Card
                key={pokemon.name}
                name={pokemon.name}
                types={pokemon.types}
                abilities={pokemon.abilities}
                stats={pokemon.stats}
                image={pokemon.imageUrl}
            />)}

        </div>
    );
};