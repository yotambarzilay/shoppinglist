import React from 'react';
import { 
  StyleSheet, 
  View
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
        <Header
          outerContainerStyles={styles.headerContainer}
          statusBarProps={{barStyle: 'dark-content', translucent:true}}
          centerComponent={{ text: 'רשימת קניות', style: styles.headerTextStyle }}
        />
        <AddItemInput addItem={add}/>
        <ItemsList items={this.state.items} removeItem={remove} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#a9a9a9",
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
