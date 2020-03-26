import React, { useEffect, useState } from 'react';
import './CardList.css';

import axios from 'axios';

import Card from './Card/Card';

import Pokemon from '../../models/pokemon';

export default props => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let allPokes = [];
        setIsLoading(true);
        const asyncFn = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
            console.log(response.data.results);
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
                allPokes.push(transformedPoke);
            };
            setIsLoading(false);
            setPokemons(allPokes);
        };
        asyncFn();
    }, []);

    return (
        <div>
            {pokemons.map(pokemon => <Card
                name={pokemon.name}
                types={pokemon.types}
                abilities={pokemon.abilities}
                stats={pokemon.stats}
                image={pokemon.imageUrl}
            />)}

        </div>
    );
};