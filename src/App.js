import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { Button, Pagination } from 'antd';
import image from './images/Pokemon.png';

import Menu from './components/Menu/Menu';
import CardList from './components/CardList/CardList';

import { PokemonContext } from './context/pokemon-context';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const context = useContext(PokemonContext);

  const filterPokemonsByNameHandler = filterValue => {
    if(filterValue.trim().length === 0) {
      return setPokemons(context.pokemons);
    };
    const filteredPokemons = pokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(filterValue.toLowerCase());
    });
    setPokemons(filteredPokemons);
  };

  useEffect(() => {
    setPokemons(context.pokemons);
  }, [context.pokemons]);

  return (
    <div className="App">
      <header>
        <img className='pokemon_picture-header' src={image} alt='pokemon_picture' />
        {/* <h1>Find Your Pokemon</h1> */}
        <Button className='button-menu'>
          <span className='one_dash'></span>
          <span className='two_dash'></span>
          <span className='three_dash'></span>
        </Button>
      </header>
      <Menu filterPokesFn={filterPokemonsByNameHandler}/>
      <CardList pokemons={pokemons}/>
      <div className='pagination-container'>
        <Pagination className='pagination' defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default App;
