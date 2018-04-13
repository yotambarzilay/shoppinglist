import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, SET_ITEMS_LIST} from './itemsActions';

const itemsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ITEMS_LIST:
            return action.items;
        case ADD_ITEM:
            return [{id: action.id, label: action.label}].concat(state);
        case REMOVE_ITEM:
            return state.filter(item => item.id !== action.id);
        case UPDATE_ITEM:
            return state.map(item => {
                if (item.id !== action.id) {
                    return item;
                }

                return {...item, label: action.label};
            });
        default:
            return state;
    }
}

export default itemsReducer;