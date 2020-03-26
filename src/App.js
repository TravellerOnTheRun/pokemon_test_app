import React from 'react';
import './App.css';
import { Button, Pagination } from 'antd';
import image from './images/Pokemon.png';

import Menu from './components/Menu/Menu';
import CardList from './components/CardList/CardList';

function App() {
  return (
    <div className="App">
      <header>
      <img className='pokemon_picture-header' src={image} alt='pokemon_picture'/>
        {/* <h1>Find Your Pokemon</h1> */}
        <Button className='button-menu'>
          <span className='one_dash'></span>
          <span className='two_dash'></span>
          <span className='three_dash'></span>
        </Button>
      </header>
      {/* < Menu /> */}
      <CardList/>
      <div className='pagination-container'>
      <Pagination className='pagination' defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default App;
