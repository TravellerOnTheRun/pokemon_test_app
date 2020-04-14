import { initStore } from './store';

import Pokemon from '../models/pokemon';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

let types = [];
let pokemonsForSearch = [];

const fetchMainVars = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    for (const type of response.data.results) {
        const newTypeObj = {
            value: type.name,
            label: type.name
        };
        types.push(newTypeObj);
    };

    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=964');
    for (const pokemon of res.data.results) {
        pokemonsForSearch.push(pokemon.name);
    };
};

fetchMainVars();

const fetchPokesByName = async (value) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`);
    let { name, abilities, sprites, stats, types } = response.data;
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
    return transformedPoke;
};

const configureStore = () => {
    const actions = {
        SET_CURRENTLY_FETCHED_POKEMONS: (curState, pokemons) => {
            return { currentlyFetchedPokemons: pokemons };
        },
        SET_TYPE_SEARCH_IS_ACTIVE: (curState, value) => {
            return { typesSearchIsActive: value };
        },
        SET_SEARCH_ACTIVE: (curState, value) => {
            return { searchIsActive: value };
        },
        FILTER_CURRENT_POKEMONS: (curState, payload) => {
            console.log(`[FILTER_CURRENT_POKEMONS]: `, payload);
            let newArray;
            if (!payload) {
                const { currentlyFetchedPokemons, currentOffset, itemsPerPage } = curState;
                newArray = currentlyFetchedPokemons.slice(currentOffset, currentOffset + itemsPerPage);
                console.log(newArray);
            } else {
                newArray = payload;
            };

            return {
                filteredPokemons: newArray,
                isLoading: false
            };
        },
        SET_TOTAL: (curState, total) => {
            let value;
            if(total >= 0) {
                value = total;
            } else {
                value = 964;
            };
            return { total: value };
        },
        FIND_BY_NAME: (curState, value) => {
            let pokemonFound_Names = [];
            let pokemonFound = [];
            pokemonFound_Names = pokemonsForSearch.filter(p => p.includes(value));
            pokemonFound_Names.forEach(async (p) => {
                console.log(p);
                const pokeObj = await fetchPokesByName(p);
                pokemonFound.push(pokeObj);
            });
            return { filteredPokemons: pokemonFound, isLoading: false };
        },
        SET_IS_LOADING: (curState, isLoading) => {
            return { isLoading };
        }
    };


    initStore(actions, {
        currentlyFetchedPokemons: [],
        filteredPokemons: [],
        searchIsActive: false,
        typesSearchIsActive: false,
        isLoading: false,
        total: 964,
        types: types,
    });
};

export default configureStore;




