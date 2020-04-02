import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { Button, Pagination, Spin } from 'antd';
import image from './images/Pokemon.png';

import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import MenuDesktop from './components/Menu/MenuDesktop';
import CardList from './components/CardList/CardList';

import { PokemonContext } from './context/pokemon-context';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);

  const context = useContext(PokemonContext);

  useEffect(() => {
    if (context.token) {
      setShowUserProfileMenu(true);
    } else {
      setShowUserProfileMenu(false);
    };
  }, [context.token])

  useEffect(() => {
    setPokemons(context.pagePokes);
    setShowMenu(false);
  }, [context.pagePokes]);

  const filterPokemonsByNameHandler = filterValue => {
    console.log(filterValue);
    if (filterValue.trim().length === 0) {
      setShowMenu(false);
      return context.fetchPokes();
    } else {
      console.log(context.allPokemons);
      const filteredPokemons = context.allPokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(filterValue.toLowerCase());
      });
      if (!filteredPokemons) {
        setPokemons([]);
      };
      setPokemons(filteredPokemons);
      context.pokesTotal = 0;
      setShowMenu(false);
    };
  };

  const onPageChangeHandler = page => {
    context.pageChangedHandler(page);
  };

  const onLogoutHandler = () => {
    context.logout();
    setShowUserProfileMenu(false);
  };

  let mainComponent = <Spin size='large' />
  let cardListComponent = <CardList pokemons={pokemons} />

  if (!pokemons) {
    cardListComponent = <p>No pokemons found!</p>;
  };

  if (!context.isLoading) {
    mainComponent = (
      <main>
        {
          showLogin
            ? <Login
              dismissLogin={() => setShowLogin(false)}
              storeToken={context.storeTokenHandler}
            />
            : null
        }
        <MenuDesktop />
        {
          showMenu ? (
            <div>
              <div className='backdrop' onClick={() => setShowMenu(prevState => !prevState)}></div>
              <Menu
                token={context.token}
                openLogin={() => {
                  setShowLogin(true);
                  setShowMenu(false);
                }}
                logout={onLogoutHandler}
                showUserProfile={showUserProfileMenu}
                filterPokesFn={filterPokemonsByNameHandler}
                onChangePokes={context.fetchPokes}
              />
            </div>
          ) : null
        }
        {
          context.isLoading
            ? <Spin size='large' tip='LOADING...' />
            : cardListComponent
        }
      </main>
    );
  };

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
      {mainComponent}
      <div className='pagination-container'>
        <Pagination
          className='pagination'
          defaultCurrent={1}
          total={context.pokesTotal}
          pageSize={context.itemsPerPage}
          pageSizeOptions={['10', '20', '30', '50']}
          onChange={onPageChangeHandler}
          showSizeChanger
          onShowSizeChange={(current, size) => console.log(current, size)}
          hideOnSinglePage
        />
      </div>
    </div>
  );
}

export default App;
