import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import ItemsList from './ItemsList';
import EmptyView from './EmptyListView';
import AddItemInput from './AddItemInput';

const ShoppingListView = ({items, remove, add}) => (
    <View style={styles.container}>
        {
            items.length 
                ? <ItemsList key="itemsList" items={items} removeItem={remove} />
                : <EmptyView key="emptyView" />
        }
        <SafeAreaView style={styles.footer}>
            <AddItemInput addItem={add}/>
        </SafeAreaView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        backgroundColor: '#f9f9f9'
    },
    noItems: {
       
    }
});

export default ShoppingListView;