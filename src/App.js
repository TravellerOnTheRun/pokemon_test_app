import React, { useState } from 'react';
import './App.css';
import { Button, Pagination, Spin } from 'antd';
import image from './images/Pokemon.png';


import { useStore } from './hooks-store/store';
import { usePrevious } from './utility/custom-hooks';

import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import MenuDesktop from './components/Menu/MenuDesktop';
import CardList from './components/CardList/CardList';

function App() {
  const [state, dispatch] = useStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);


  const onPageChangeHandler = pg => {
    console.log('Previous Page: ' + state.page);
    console.log('Received page: ' + pg);
    if (pg > state.page) {
      dispatch('SET_PAGE', pg);
      dispatch('SET_CUR_OFFSET', state.currentOffset + state.itemsPerPage * (pg - state.page));
    } else {
      console.log('[else]');
      dispatch('SET_PAGE', pg);
      dispatch('SET_CUR_OFFSET', state.currentOffset - state.itemsPerPage * (state.page - pg));
    };
  };

  const onLogoutHandler = () => {
    setShowUserProfileMenu(false);
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
      <main>
        {
          showLogin
            ? 
            <div>
              <div className='backdrop' onClick={() => setShowLogin(prevState => !prevState)}></div>
              <Login
              dismissLogin={() => setShowLogin(false)}
            />
            </div>
            : null
        }
        <MenuDesktop />
        {
          showMenu ? (
            <div>
              <div className='backdrop' onClick={() => setShowMenu(prevState => !prevState)}></div>
              <Menu
                openLogin={() => {
                  setShowLogin(true);
                  setShowMenu(false);
                }}
                closeMenu={() => setShowMenu(false)}
                logout={onLogoutHandler}
                showUserProfile={showUserProfileMenu}
              />
            </div>
          ) : null
        }
        <CardList />
      </main>
      <div className='pagination-container'>
        <Pagination
          className='pagination'
          defaultCurrent={1}
          current={state.page}
          total={state.total}
          pageSize={state.itemsPerPage}
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
