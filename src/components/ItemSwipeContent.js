import React from 'react';
import { 
    StyleSheet,
    Animated } from 'react-native'
import { Icon } from 'react-native-elements'

const TRANSFORM_RANGE = [-70, -30];

const ItemSwipeContent = ({swipeValue}) => {
    const scale = swipeValue
        ? swipeValue.interpolate({
            inputRange: TRANSFORM_RANGE,
            outputRange: [1, 0],
            extrapolate: 'clamp',
        })
        : 0;

    const backgroundColor = swipeValue
        ? swipeValue.interpolate({
            inputRange: [-360].concat(TRANSFORM_RANGE),
            outputRange: ['rgba(161,19,17, 1)', 'rgba(214,26,23, 1)', 'rgba(238, 89, 81, 1)'],
            extrapolate: 'clamp',
        })
        : 0;

    const animationStyles = {
        iconWrapper:  {
            transform: [{scale}]
        },
        container: {backgroundColor}
    };

    return (
        <Animated.View style={[styles.swipeContainer, animationStyles.container]}>
            <Animated.View style={animationStyles.iconWrapper}>
                <Icon name="delete" color="white" />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    swipeContainer: {
        flex: 0,
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
        
    }
});

export default ItemSwipeContent;