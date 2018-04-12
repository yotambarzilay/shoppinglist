import React from 'react';
import { View } from 'react-native'
import Item from './Item';

const ItemsList = ({items, removeItem}) => (
	<View>
		{items.map(item => <Item key={item.id} item={item} removeItem={removeItem} />)}
	</View>
);
    
export default ItemsList;