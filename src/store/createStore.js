import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

export default function create(dataAPI) {
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(dataAPI)));
}