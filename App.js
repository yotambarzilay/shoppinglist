import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import createStore from './src/store/createStore';

const store = createStore();
import {addItem, removeItem, updateItem} from './src/store/items/itemsActions';
let addedItemId = 0;

const add = () => {
  store.dispatch(addItem(addedItemId, `item ${addedItemId} label`))
  addedItemId++;
}

const remove = () => {
  store.dispatch(removeItem(--addedItemId));
}

const update = () => {
  store.dispatch(updateItem(addedItemId - 1, Date.now()));
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state)}</Text>
        <Button onPress={add} title="Add"></Button>
        <Button onPress={remove} title="Remove"></Button>
        <Button onPress={update} title="UPDATE"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
