import React from 'react';
import { 
    StyleSheet,
    Animated } from 'react-native'
import { Icon } from 'react-native-elements'

class ItemSwipeContent extends React.Component {
    constructor(props) {
        super(props);

        this._animated = new Animated.Value(0);
    }

    render() {
        const animationStyles = {
            iconWrapper:  {
                transform: [
                    {scale: this._animated}
                ]
            },
            container: {
                backgroundColor: this._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(238, 89, 81, 1)', 'rgba(214,26,23, 1)'],
                    extrapolate: 'clamp',
                })
            }
        };

        return (
            <Animated.View style={[styles.swipeContainer, animationStyles.container]}>
                <Animated.View style={animationStyles.iconWrapper}>
                    <Icon name="delete" color="white" />
                </Animated.View>
            </Animated.View>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            Animated.timing(this._animated, {
                toValue: this.props.isActive ? 1 : 0,
                duration: 150,
            }).start();
        }
    }
};

const styles = StyleSheet.create({
    swipeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
        
    }
});

export default ItemSwipeContent;