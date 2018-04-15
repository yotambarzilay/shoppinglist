export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEMS_LIST = 'SET_ITEMS_LIST';

export const addItem = (id, label) => (dispatch, getState, dataAPI) => {
    dispatch({type: ADD_ITEM, id, label});
    const item = getState().items.find(i => i.id === id);
    dataAPI.addItem(item);
};

export const removeItem = id => (dispatch, getState, dataAPI) => {
    dispatch({type: REMOVE_ITEM, id});
    dataAPI.removeItem(id);
};

export const updateItem = (id, label) => ({type: UPDATE_ITEM, id, label});
export const setItemsList = (items) => ({type: SET_ITEMS_LIST, items});