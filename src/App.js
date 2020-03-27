import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { Button, Pagination } from 'antd';
import image from './images/Pokemon.png';

import Menu from './components/Menu/Menu';
import CardList from './components/CardList/CardList';

import { PokemonContext } from './context/pokemon-context';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const context = useContext(PokemonContext);

  const filterPokemonsByNameHandler = filterValue => {
    if (filterValue.trim().length === 0) {
      setShowMenu(false);
      return setPokemons(context.pokemons);
    };
    const filteredPokemons = pokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(filterValue.toLowerCase());
    });
    setPokemons(filteredPokemons);
    setShowMenu(false);
  };

  useEffect(() => {
    setPokemons(context.pokemons);
  }, [context.pokemons]);

  return (
    <div className="App">
      <header>
        <img className='pokemon_picture-header' src={image} alt='pokemon_picture' />
        <Button className='button-menu' onClick={() => setShowMenu(prevState => !prevState)}>
          <span className='one_dash'></span>
          <span className='two_dash'></span>
          <span className='three_dash'></span>
        </Button>
      </header>
      {
        showMenu ? (
          <div>
            <div className='backdrop' onClick={() => setShowMenu(prevState => !prevState)}></div>
            <Menu filterPokesFn={filterPokemonsByNameHandler} />
          </div>
        ) : null
      }
      <CardList pokemons={pokemons} />
      <div className='pagination-container'>
        <Pagination className='pagination' defaultCurrent={1} total={context.pokesTotal} />
      </div>
    </div>
  );
}

export default App;
