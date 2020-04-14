import React, { useEffect, useState } from 'react';
import './CardList.css';

import { useStore } from '../../hooks-store/store';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button, Spin } from 'antd';

import Pokemon from '../../models/pokemon';


import Card from './Card/Card';

const fetchPokesForPageLoad = async (currentOffset = 0, pokesPerPage = 10) => {
  let pokemonsShown = [];
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${pokesPerPage}`);
  for (const pokemon of response.data.results) {
    const res = await axios.get(pokemon.url);
    let { name, abilities, sprites, stats, types } = res.data;
    abilities = abilities.map(a => a.ability.name);
    stats = stats.map(s => s.stat.name);
    types = types.map(t => t.type.name);

    const transformedPoke = new Pokemon(
      uuidv4(),
      name,
      types,
      sprites.front_default,
      abilities,
      stats
    );
    pokemonsShown.push(transformedPoke);
  };
  return pokemonsShown;
};

export default props => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    dispatch('SET_IS_LOADING', true);
    if (state.typesSearchIsActive) {
      console.log(`[if]`);
      dispatch('FILTER_CURRENT_POKEMONS');
    } else if (state.searchIsActive) {
      return;
    } else {
      console.log(`[else]`);
      const asyncFn = async () => {
        const pokes = await fetchPokesForPageLoad(state.currentOffset, state.itemsPerPage);
        dispatch('FILTER_CURRENT_POKEMONS', pokes);
      };
      asyncFn();
    };
  }, [
    state.currentOffset,
    state.itemsPerPage,
    state.typesSearchIsActive,
    state.searchIsActive,
    dispatch
  ]);

  let component = (
    <div className='cardlist-component'>
      {state.filteredPokemons.map(pokemon =>
        <Card
          key={pokemon._id}
          _id={pokemon._id}
          name={pokemon.name}
          types={pokemon.types}
          abilities={pokemon.abilities}
          stats={pokemon.stats}
          image={pokemon.imageUrl}
        />)}
    </div>
  );
  if (state.isLoading) {
    component = (
      <div className='centered'>
        <Spin size='large'/>
      </div>
    );
  };
  if (state.filteredPokemons.length === 0) {
    component = <div className='centered'>
      <p>No pokes found!</p>
      <p>To see all Pokemons reload the page</p>
    </div>
  };

  return component;
};