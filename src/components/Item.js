import React from 'react';
import { Animated } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'

import SwipeRow from './SwipeRow';
import ItemSwipeContent from './ItemSwipeContent';

const ROW_HEIGHT = 60;

class Item extends React.Component {
    state = {
        swipeValue: null
    };

    _animated = new Animated.Value(0);

    removeItem = () => {
        Animated.timing(this._animated, {
            toValue: 0,
            duration: 150,
        }).start(() => this.props.removeItem());
    }

    render() {
        const {id, label, setScrollEnabled} = this.props;
        const rowStyle = {
            height: this._animated.interpolate({
                inputRange: [0, 1],
                outputRange: [1, ROW_HEIGHT + 1],
                extrapolate: 'clamp',
            }),
            opacity: this._animated
        }

        const rightIconProps = {
            type: 'evilicon',
            name: 'chevron-left',
            color: '#d4d6d8',
            size: 28,
            containerStyle: {
                paddingTop: 3
            }
        };

        return (
            <Animated.View style={rowStyle}>
                <SwipeRow
                    disableRightSwipe
                    recalculateHiddenLayout
                    rightOpenValue={-300}
                    swipeToOpenVelocityContribution={1}
                    onRowDidOpen={this.removeItem}
                    onSwipeAnimatedValueReady={swipeValue => this.setState({swipeValue})}
                    setScrollEnabled={setScrollEnabled}
                >
                    <ItemSwipeContent swipeValue={this.state.swipeValue}/>
                    <ListItem
                        containerStyle={{height: ROW_HEIGHT}}
                        hideChevron
                        key={`item_${id}`}
                        title={label}
                        titleStyle={{textAlign: 'right', color: '#191919'}}
                        rightIcon={rightIconProps}
                    />
                </SwipeRow>
                <Divider style={{backgroundColor: '#e9e9e9'}}/>
            </Animated.View>
        );
    }

    componentDidMount() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: 150,
        }).start();
    }
}

import { connect } from 'react-redux';
import { removeItem } from '../store/items/itemsActions';

const mapStateToProps = ({items}, {id}) => {
    const {label} = items.find(item => item.id === id);
    return {id, label};
};

const mapDispatchToProps = (dispatch, {id}) => ({
    removeItem: () => dispatch(removeItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);