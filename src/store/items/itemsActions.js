export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const addItem = (id, label) => ({type: ADD_ITEM, id, label});
export const removeItem = id => ({type: REMOVE_ITEM, id});
export const updateItem = (id, label) => ({type: UPDATE_ITEM, id, label});