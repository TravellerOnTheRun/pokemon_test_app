import { initStore } from './store';

const configureStore = () => {
    const actions = {
        LOGIN: (curState, authObj) => {
            return {
                token: authObj.token,
                userId: authObj.userId,
                favs: authObj.favs,
                username: authObj.username
            };
        },
        LOGOUT: (curState) => {
            localStorage.removeItem('token');
            localStorage.removeItem('expiryDate');
            localStorage.removeItem('userId');
            localStorage.removeItem('favs');
            localStorage.removeItem('username');
            return {
                token: null,
                userId: null,
                favs: [],
                username: ''
            }
        },
        ADD_FAV: (curState, fav) => {
            return { favs: curState.favs.concat(fav) };
        },
        REMOVE_FAV: (curState, name) => {
            return { favs: curState.favs.filter(f => f.name !== name)};
        }
    };

    initStore(actions, {
        token: null,
        userId: null,
        favs: [],
        username: ''
    });
};

export default configureStore;