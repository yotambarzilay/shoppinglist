import React from 'react';
import { 
  StyleSheet, 
  Text,
  View, 
  Button, 
  SafeAreaView
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import createStore from './src/store/createStore';
import {addItem, removeItem, updateItem} from './src/store/items/itemsActions';
import ItemsList from './src/components/ItemsList';

const store = createStore();

let addedItemId = 0;

const add = () => {
  store.dispatch(addItem(addedItemId, `item ${addedItemId} label`))
  addedItemId++;
}

const remove = id => {
  store.dispatch(removeItem(id));
}

const update = () => {
  store.dispatch(updateItem(addedItemId - 1, Date.now()));
}

add();
add();
add();

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
      <SafeAreaView style={styles.container}>
        <Input  placeholder="הוספה"
                leftIcon={
                  <Icon
                      name='add'
                      size={24}
                      color='#a9d6b2'
                  />
                }
        />
        <ItemsList items={this.state.items} removeItem={remove} />

        <Button onPress={add} title="Add"></Button>
        <Button onPress={remove} title="Remove"></Button>
        <Button onPress={update} title="UPDATE"></Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
