import React, { useState, useEffect } from 'react';
import { usePrevious } from '../utility/custom-hooks';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import Pokemon from '../models/pokemon';

export const PokemonContext = React.createContext({
    pokemons: [],
    fetchPokes: () => { },
    pokemonsChanged: () => { },
    itemsPerPage: 0,
    currentOffset: 0,
    currentPageNumber: 1,
    pokesTotal: 0
});

const PokemonContextProvider = props => {
    //Global State
    const [currentlyFetchedPokes, setCurrentlyFetchedPokes] = useState([]);
    const [pagePokes, setPagePokes] = useState([])
    const [pokesTotal, setPokesTotal] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [URL, setURL] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //Previous State
    const previousPage = usePrevious(currentPageNumber);
    const prevPagePokes = usePrevious(pagePokes);
    const prevUrl = usePrevious(URL);

    const fetchThem = async (url, multiple) => {
        setIsLoading(true);
        if (prevUrl !== url || !url) {
            console.log(`URL: ${url}`);
            console.log(`Current URL: ${URL}`);
            console.log(`Current Offset: ${currentOffset}`);
            console.log(`Items per page: ${itemsPerPage}`);
            console.log(`Pokes Total: ${pokesTotal}`);

            setURL(url);
            setPagePokes([]);
            let response;

            if (!url) {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${itemsPerPage}`);
                setPokesTotal(response.data.count);
                for (const pokemon of response.data.results) {
                    const res = await axios.get(pokemon.url);
                    const { name, abilities, sprites, stats, types } = res.data;
                    const transformedPoke = new Pokemon(
                        uuidv4(),
                        name,
                        types,
                        sprites.front_default,
                        abilities,
                        stats
                    );
                    setPagePokes(prevState => {
                        return [...prevState, transformedPoke];
                    });
                };
                return true;
            } else {
                let newCurFetchedPokes = [];
                console.log(`[ELSE BLOCK IN FETCH THEM FN]`);
                response = await axios.get(url);
                for (const pokemon of response.data.pokemon) {
                    const res = await axios.get(pokemon.pokemon.url);
                    const { name, abilities, sprites, stats, types } = res.data;
                    const transformedPoke = new Pokemon(
                        uuidv4(),
                        name,
                        types,
                        sprites.front_default,
                        abilities,
                        stats
                    );
                    newCurFetchedPokes.push(transformedPoke);
                };
                setCurrentlyFetchedPokes(prevState => {
                    if(multiple) {
                        return [ ...prevState, ...newCurFetchedPokes];
                    };
                    return newCurFetchedPokes;
                });
                return true;
            };
        } else {
            return false;
        }
    };

    const pageChangedHandler = page => {
        console.log(page);
        setCurrentPageNumber(page);
        setCurrentOffset(prevState => {
            if (page > previousPage) {
                return prevState + itemsPerPage * (page - previousPage);
            } else if (page < previousPage) {
                return prevState - itemsPerPage * (previousPage - page);
            };
        });
    };

    useEffect(() => {
        fetchThem(URL).then(res => {
            console.log(res);
            if(res) {
                setIsLoading(false);
            };
        });
    }, [currentPageNumber, currentOffset, itemsPerPage]);

    useEffect(() => {
        setPokesTotal(currentlyFetchedPokes.length);
        console.log(currentlyFetchedPokes);
        const newPagePokes = currentlyFetchedPokes.slice(currentOffset, currentOffset + itemsPerPage);
        setPagePokes(newPagePokes);
    }, [currentlyFetchedPokes, currentPageNumber]);

    useEffect(() => {
        setIsLoading(false);
    }, [pagePokes])

    return (
        <PokemonContext.Provider value={{
            currentlyFetchedPokes,
            fetchPokes: fetchThem,
            pokesTotal,
            itemsPerPage,
            currentOffset,
            currentPageNumber,
            pageChangedHandler,
            pagePokes,
            isLoading
        }}>
            {props.children}
        </PokemonContext.Provider>
    );
};

export default PokemonContextProvider;
