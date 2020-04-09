import { initStore } from './store';

const configureStore = () => {
    const actions = {
        SET_CUR_OFFSET: (curState, offset) => {
            return { currentOffset: offset };
        },
        SET_ITEMS_PER_PAGE: (curState, itemsPerPage) => {
            return { itemsPerPage }; 
        },
        SET_PAGE: (curState, page) => {
            return { page };
        }
    };

    initStore(actions, {
        page: 1,
        itemsPerPage: 10,
        currentOffset: 0
    });
};

export default configureStore;