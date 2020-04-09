import React, { useState } from 'react';
import { useStore } from '../../../hooks-store/store';

import Pokemon from '../../../models/pokemon';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Filters.css';
import { Input, Checkbox, Button } from 'antd';
const { Search } = Input;



export default props => {
    const [state, dispatch] = useStore();
    const [checkedValues, setCheckedValues] = useState([]);


    const searchActivateHandler = async () => {
        console.log(checkedValues);
        if(checkedValues.length === 0) {
            dispatch('SET_SEARCH_ACTIVE', false);
            dispatch('SET_TYPE_SEARCH_IS_ACTIVE', false);
            props.closeMenu();
            return;
        };
        dispatch('SET_SEARCH_ACTIVE', false);
        dispatch('SET_CURRENTLY_FETCHED_POKEMONS', []);
        dispatch('SET_TYPE_SEARCH_IS_ACTIVE', true);
        let searchedPokes = [];
        for (const type of checkedValues) {
            const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
            const pokemonArray = res.data.pokemon;
            for (const poke of pokemonArray) {
                const p = await axios.get(poke.pokemon.url);
                let { name, abilities, sprites, stats, types } = p.data;
                abilities = abilities.map(a => a.ability.name);
                stats = stats.map(s => s.stat.name);
                types = types.map(t => t.type.name);

                const transformedPoke = new Pokemon(
                    uuidv4(),
                    name,
                    types,
                    sprites.front_shiny,
                    abilities,
                    stats
                );
                searchedPokes.push(transformedPoke);
            };
        };
        dispatch('SET_PAGE', 1);
        dispatch('SET_CUR_OFFSET', 0);
        dispatch('SET_CURRENTLY_FETCHED_POKEMONS', searchedPokes);
        dispatch('FILTER_CURRENT_POKEMONS');
        dispatch('SET_TOTAL', searchedPokes.length);
        setCheckedValues([]);
        return console.log('DONE');
    };

    const typeChangedHandler = checkedValues => {
        setCheckedValues(checkedValues);
    };

    const onSearchEnterHandler = value => {
        console.log(value);
        if(value.trim().length === 0) {
            dispatch('SET_SEARCH_ACTIVE', false);
            dispatch('SET_TYPE_SEARCH_IS_ACTIVE', false);
            dispatch('SET_TOTAL');
            props.closeMenu();
            return;
        };
        dispatch('FIND_BY_NAME', value);
        dispatch('SET_TYPE_SEARCH_IS_ACTIVE', false);
        dispatch('SET_SEARCH_ACTIVE', true);
        dispatch('SET_TOTAL', 0);
        props.closeMenu();
    };

    return (
        <div className='filters-component'>
            <Search className='filters-search'
                placeholder="Find your pokemon by its name"
                enterButton
                size="large"
                onSearch={onSearchEnterHandler}
            />
            <Checkbox.Group className='checkbox' options={state.types} onChange={typeChangedHandler} value={checkedValues} />
            <Button className='checkbox-btn' onClick={searchActivateHandler}>Search by selected tags</Button>
        </div>
    );
};