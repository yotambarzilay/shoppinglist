import React from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-native-elements';
import createStore from './src/store/createStore';
import {addItem, removeItem} from './src/store/items/itemsActions';
import ShoppingListView from './src/components/ShoppingListView';

const store = createStore();

let addedItemId = 0;

const add = (id, label) => {
  store.dispatch(addItem(id, label))
}

const remove = id => {
  store.dispatch(removeItem(id));
}

// add('a', 'הום');
// add('b', 'גנט');
// add('c', 'טים');

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
          networkActivityIndicatorVisible={true}
          outerContainerStyles={styles.headerContainer}
          statusBarProps={{barStyle: 'dark-content'}}
          centerComponent={{ text: 'רשימת קניות', style: styles.headerTextStyle }}
        />
        <ShoppingListView items={this.state.items} add={add} remove={remove} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
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
