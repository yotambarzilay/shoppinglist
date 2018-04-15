import React from 'react';
import {Provider} from 'react-redux';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { AppLoading } from 'expo';
import {Header} from 'react-native-elements';
import ShoppingListView from './src/components/ShoppingListView';
import FadeScaleAnimation from './src/components/FadeScaleAnimation';
import createStore from './src/store/createStore';
import {setItemsList, onItemAdded, onItemRemoved} from './src/store/items/itemsActions';
import DataAPI from './src/data/DataAPI';

const dataAPI = new DataAPI();
const store = createStore(dataAPI);

export default class ShoppingListApp extends React.Component {
    constructor(props) {
        super(props);

        // FOR DEBUGGING
        this.state = {
            loading: true
        };

        dataAPI.fetchItems().then(items => {
            dataAPI.listenToItemAdded(({id, label}) => store.dispatch(onItemAdded(id, label)));
            dataAPI.listenToItemRemoved(id => store.dispatch(onItemRemoved(id)));
            store.dispatch(setItemsList(items));
            this.setState({loading: false});
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
                            { this.state.loading
                                ? <ActivityIndicator style={styles.loadingContainer} size="large" />
                                : <ShoppingListView key="shoppingListView"/>
                            }
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    }
});
