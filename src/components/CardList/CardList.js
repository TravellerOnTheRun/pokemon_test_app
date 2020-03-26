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
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(response => {
                for (const pokemon of response.data.results) {
                    axios.get(pokemon.url)
                        .then(res => {
                            const { species, abilities, sprites, stats, types } = res.data;
                            const transformedPoke = new Pokemon(
                                species.name,
                                types,
                                sprites.front_default,
                                abilities,
                                stats
                            );
                            allPokes.push(transformedPoke);
                        });
                };
            })
            .then(() => {
                setIsLoading(false);
                setPokemons(allPokes);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err)
            });
    }, []);

    return (
        <div>
            {isLoading
                ? ''
                : pokemons.forEach(pokemon =>
                    <Card
                        name={pokemon.name}
                        types={pokemon.types}
                        abilities={pokemon.abilities}
                        stats={pokemon.stats}
                        image={pokemon.imageUrl}
                    />
                )}
        </div>
    );
};