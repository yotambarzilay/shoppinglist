import React from 'react';
import { StyleSheet, SafeAreaView, View, Animated } from 'react-native';
import ItemsList from './ItemsList';
import Fade from './Fade';
import EmptyView from './EmptyListView';
import AddItemInput from './AddItemInput';

const ShoppingListView = ({noItems}) => (
    <View style={styles.container}>
        <Fade>
            {noItems ? <EmptyView key="emptyView" /> : null}
        </Fade>
        {noItems ? null : <ItemsList key="itemsList" />}
        <SafeAreaView style={styles.footer}>
            <AddItemInput />
        </SafeAreaView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        backgroundColor: '#f9f9f9'
    }
});

import { connect } from 'react-redux';

const mapStateToProps = ({items}) => ({
    noItems: !items.length
});

export default connect(mapStateToProps, {})(ShoppingListView);