import {createStore} from 'redux';
import reducer from './reducer';

export default function create() {
    const store = createStore(reducer, {items: []});

    return store;
}