import React from 'react';
import './App.css';

import { Button, Pagination } from 'antd';

import Menu from './components/Menu/Menu';
import CardList from './components/CardList/CardList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Find Your Pokemon</h1>
        <Button>
          <span></span>
          <span></span>
          <span></span>
        </Button>
      </header>
      {/*<Menu />*/}
      <CardList />
      <Pagination />
    </div>
  );
}

export default App;
