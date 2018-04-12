import React from 'react';
import { Animated } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'

import SwipeRow from './SwipeRow';
import ItemSwipeContent from './ItemSwipeContent';

const ROW_HEIGHT = 60;

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.removeItem = this.removeItem.bind(this);
        this._animated = new Animated.Value(0);
    }

    removeItem() {
        const { removeItem, id } = this.props;
        Animated.timing(this._animated, {
            toValue: 0,
            duration: 150,
        }).start(() => removeItem(id));
    }

    render() {
        const {id, label} = this.props.item;
        const {isActive} = this.state;
        const rowStyle = {
            height: this._animated.interpolate({
                inputRange: [0, 1],
                outputRange: [1, ROW_HEIGHT + 1],
                extrapolate: 'clamp',
            }),
            opacity: this._animated
        }

        return (
            <Animated.View style={rowStyle}>
                <SwipeRow
                    disableRightSwipe
                    recalculateHiddenLayout
                    rightOpenValue={-130}
                    stopRightSwipe={-250}
                    onRowOpen={this.removeItem}
                    onThresholdCrossed={isActive => this.setState({isActive})}
                >
                    <ItemSwipeContent item={this.props.item} isActive={isActive} />
                    <ListItem
                        containerStyle={{height: ROW_HEIGHT}}
                        hideChevron
                        key={`item_${id}`}
                        title={label}
                        roundAvatar
                        leftIcon={{ name: 'flight-takeoff', color: '#d4d6d8' }}
                    />
                </SwipeRow>
                <Divider />
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

export default Item;