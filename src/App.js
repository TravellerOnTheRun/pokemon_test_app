import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Pagination, Spin } from 'antd';
import image from './images/Pokemon.png';


import { useStore } from './hooks-store/store';

import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import CardList from './components/CardList/CardList';

function App() {
  const [state, dispatch] = useStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);

  useEffect(() => {
    let timeout;
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    };
    const expiryDate = new Date(localStorage.getItem('expiryDate'));
    if (expiryDate > new Date()) {
      const expiresIn = expiryDate.getTime() - new Date().getTime();
      console.log('before login');
      timeout = setTimeout(() => {
        console.log('timeout logout');
        dispatch('LOGOUT');
      }, expiresIn);
      const userId = localStorage.getItem('userId');
      const favs = JSON.parse(localStorage.getItem('favs'));
      const username = localStorage.getItem('username');
      dispatch('LOGIN', { token, userId, favs, username});
      setShowLogin(false);
    } else {
      console.log('before logout');
      dispatch('LOGOUT');
      dispatch('LOG');
      setShowUserProfileMenu(false);
    };
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  useEffect(() => {
    if(!state.token) {
      setShowUserProfileMenu(false);
      return;
    }
    setShowUserProfileMenu(true);
  }, [state.token])


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
        <Menu className='menu' style='menu-component_desktop' />
        <Menu
          style='menu-component'
          openLogin={() => {
            setShowLogin(true);
            setShowMenu(false);
          }}
          closeMenu={() => setShowMenu(false)}
          isShown={showMenu}
          showUserProfile={showUserProfileMenu}
          logout={onLogoutHandler}
        />
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
