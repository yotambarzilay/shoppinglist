import React from 'react';
import { Animated, StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

class IconClass extends React.Component {
    render() {
        return <Icon {...this.props} />
    }
}
const AnimatedIcon = Animated.createAnimatedComponent(IconClass);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

class AddItemInput extends React.Component {
    state = {value: ''};
    _color = new Animated.Value(0);
    _textInput = null;

    setValue = (value) => {
        this.setState({value});
    }

    onSubmitEditing = () => {
        if (!this.state.value) {
            return this._textInput.blur();
        }

        this.props.onSubmit(this.state.value);
        this.setValue('');
    }

    setFocused = focused => {
        Animated.timing(this._color, {
            duration: 200,
            toValue: focused ? 1 : 0
        }).start();
    }

    render() {
        const iconColor = this._color.interpolate({
            inputRange: [0, 1],
            outputRange: ['#dfdfdf', '#afafaf'],
            extrapolate: 'clamp',
        });

        const dividerAnimatedPositionStyle = {
            transform: [{
                translateX: this._color.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                    extrapolate: 'clamp'
                })
            }]
        };

        return (
            <View style={styles.container}>
                <AnimatedIcon 
                    size={32} 
                    name="pencil" 
                    type="evilicon" 
                    color={iconColor} 
                    containerStyle={styles.icon}
                />
                <AnimatedTextInput
                    ref={ref => ref ? this._textInput = ref.getNode() : this._textInput = null}
                    style={styles.input}
                    placeholder="מה צריך?"
                    placeholderTextColor={'#dfdfdf'}
                    controlled
                    value={this.state.value}
                    onChange={e => this.setValue(e.nativeEvent.text)}
                    onFocus={() => this.setFocused(true)}
                    onBlur={() => this.setFocused(false)}
                    blurOnSubmit={false}
                    onSubmitEditing={this.onSubmitEditing}
                    returnKeyType='done'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 0,
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#d9d9d9',
        backgroundColor: '#f9f9f9'
    },
    icon: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        width: 40,
        height: 60
    },
    input: {
        flex: 1,
        marginRight: 20,
        marginStart: 10,
        height: 60,
        fontSize: 18,
        textAlign: 'right'
    }
});

import { connect } from 'react-redux';

let suffix = 0;
import { addItem } from '../store/items/itemsActions';
const generateId = () => `${Date.now().toString(36)}${suffix++}`;

const mapDispatchToProps = dispatch => ({
    onSubmit: value => dispatch(addItem(generateId(), value))
});

export default connect(null, mapDispatchToProps)(AddItemInput);