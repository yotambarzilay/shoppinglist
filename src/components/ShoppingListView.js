import React from 'react';
import { StyleSheet, SafeAreaView, View, Animated } from 'react-native';
import ItemsList from './ItemsList';
import EmptyView from './EmptyListView';
import AddItemInput from './AddItemInput';

// class Fade extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             unmountingComponent: null
//         };
//
//         this._animated = new Animated.Value(props.children ? 1 : 0);
//     }
//
//     componentWillReceiveProps(nextProps) {
//         if (!nextProps.children)
//     }
//
//     render() {
//         const scale = this._animated.interpolate({
//             fromRange: [0, 1],
//             toRange: [1.1, 1],
//             extrapolate: 'clamp'
//         });
//
//         return (
//             <Animated.View style={{opacity: this._animated, transform: [{scale}]}}>
//                 {this.props.children || this.state.unmountingComponent}
//             </Animated.View>
//         )
//     }
//
// }

const ShoppingListView = ({noItems}) => (
    <View style={styles.container}>
        {noItems ?  <EmptyView key="emptyView" /> : <ItemsList key="itemsList" />}
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