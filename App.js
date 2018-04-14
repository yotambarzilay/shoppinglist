import React from 'react';
import {Provider} from 'react-redux';
import {
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import {Header} from 'react-native-elements';
import ShoppingListView from './src/components/ShoppingListView';
import createStore from './src/store/createStore';


const store = createStore();

export default class ShoppingListApp extends React.Component {
    constructor(props) {
        super(props);

        // FOR DEBUGGING
        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        })
    }

    render() {
        return (
            <Provider store={store}>
                <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={0} behavior="padding">
                    <Header
                        outerContainerStyles={styles.headerContainer}
                        statusBarProps={{barStyle: 'dark-content'}}
                        centerComponent={{text: 'רשימת קניות', style: styles.headerTextStyle}}
                    />
                    <ShoppingListView/>
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
