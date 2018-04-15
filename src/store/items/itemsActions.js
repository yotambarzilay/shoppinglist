export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEMS_LIST = 'SET_ITEMS_LIST';

export const addItem = label => (dispatch, getState, dataAPI) => {
    const id = dataAPI.addItem(label);
    dispatch(onItemAdded(id, label));
};

export const onItemAdded = (id, label) => ({type: ADD_ITEM, id, label});

export const removeItem = id => (dispatch, getState, dataAPI) => {
    dispatch(onItemRemoved(id));
    dataAPI.removeItem(id);
};

export const onItemRemoved = id => ({type: REMOVE_ITEM, id});

export const updateItem = (id, label) => ({type: UPDATE_ITEM, id, label});
export const setItemsList = (items) => ({type: SET_ITEMS_LIST, items});