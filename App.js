import React from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-native-elements';
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

add('a', 'Item 1');
add('b', 'Item 2');
add('c', 'Item 3');

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
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={0} behavior="padding">
        <Header
          outerContainerStyles={styles.headerContainer}
          statusBarProps={{barStyle: 'dark-content', translucent:true}}
          centerComponent={{ text: 'רשימת קניות', style: styles.headerTextStyle }}
        />
        <ItemsList items={this.state.items} removeItem={remove} />
        <AddItemInput addItem={add}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#a9a9a9",
    flex: 0,
    height: 90
  },
  headerTextStyle: {
    color: "#191919",
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flex: 1
  },
});
