import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configurePokemonsStore from './hooks-store/pokemons-store';
import configurePageInfoStore from './hooks-store/pageInfo-store';
import configureAuthStore from './hooks-store/auth-store';

configurePokemonsStore();
configurePageInfoStore();
configureAuthStore();

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
