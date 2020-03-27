import React, { useState } from 'react';

import axios from 'axios';

import Pokemon from '../models/pokemon';

export const PokemonContext = React.createContext({
    pokemons: [],
    fetchPokes: () => { }
});

const PokemonContextProvider = props => {
    const [currentlyFetchedPokes, setCurrentlyFetchedPokes] = useState([]);

    const fetchThem = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        for (const pokemon of response.data.results) {
            const res = await axios.get(pokemon.url);
            const { species, abilities, sprites, stats, types } = res.data;
            const transformedPoke = new Pokemon(
                species.name,
                types,
                sprites.front_default,
                abilities,
                stats
            );
            setCurrentlyFetchedPokes(prevState => {
                return [...prevState, transformedPoke];
            });
        };
    };

    return (
        <PokemonContext.Provider value={{ pokemons: currentlyFetchedPokes, fetchPokes: fetchThem }}>
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonContextProvider;
