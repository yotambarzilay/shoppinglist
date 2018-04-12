import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView
} from 'react-native';
import createStore from './src/store/createStore';
import {addItem, removeItem} from './src/store/items/itemsActions';
import ItemsList from './src/components/ItemsList';
import AddItemInput from './src/components/AddItemInput';

const store = createStore();

let addedItemId = 0;

const add = (id, label) => {
  store.dispatch(addItem(id, label))
}

const remove = id => {
  store.dispatch(removeItem(id));
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
      <SafeAreaView style={styles.container}>
        <AddItemInput addItem={add}/>
        <ItemsList items={this.state.items} removeItem={remove} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
