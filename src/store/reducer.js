import {combineReducers} from 'redux';
import itemsReducer from './items/itemsReducer';

export default combineReducers({
    items: itemsReducer
});

