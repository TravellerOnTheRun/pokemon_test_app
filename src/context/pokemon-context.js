import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Pokemon from '../models/pokemon';

export const PokemonContext = React.createContext({
    pokemons: [],
    fetchPokes: () => { },
    pokesTotal: 0
});

const PokemonContextProvider = props => {
    const [currentlyFetchedPokes, setCurrentlyFetchedPokes] = useState([]);
    const [pokesTotal, setPokesTotal] = useState(0);

    const fetchThem = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setPokesTotal(response.data.count);
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

    useEffect(() => {
        fetchThem();
    }, []);

    return (
        <PokemonContext.Provider value={{ pokemons: currentlyFetchedPokes, fetchPokes: fetchThem, pokesTotal }}>
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonContextProvider;
