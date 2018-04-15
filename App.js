import React from 'react';
import {Provider} from 'react-redux';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {Header} from 'react-native-elements';
import ShoppingListView from './src/components/ShoppingListView';
import createStore from './src/store/createStore';
import {setItemsList} from './src/store/items/itemsActions';
import DataAPI from './src/data/DataAPI';

const dataAPI = new DataAPI();
const store = createStore(dataAPI);

export default class ShoppingListApp extends React.Component {
    constructor(props) {
        super(props);

        // FOR DEBUGGING
        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        });

        dataAPI.fetchItems().then(items => {
            store.dispatch(setItemsList(items));
        });
    }

    render() {
        return (
            <Provider store={store}>
                <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={0} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                        <View style={styles.container}>
                            <Header
                                outerContainerStyles={styles.headerContainer}
                                statusBarProps={{barStyle: 'dark-content'}}
                                centerComponent={{text: 'רשימת קניות', style: styles.headerTextStyle}}
                            />
                            <ShoppingListView/>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Provider>
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
    }
});
