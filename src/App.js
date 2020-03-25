import React from 'react';
import './App.css';

import Menu from './components/Menu/Menu';
import CardList from './components/CardList/CardList';
import Pagination from './components/Pagination/Pagination';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Find Your Pokemon</h1>
        <button>burger icon</button>
      </header>
      {/*<Menu />*/}
      <CardList />
      <Pagination />
    </div>
  );
}

export default App;
