import React from 'react';
import { Animated, StyleSheet, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

class IconClass extends React.Component {
    render() {
        return <Icon {...this.props} />
    }
}
const AnimatedIcon = Animated.createAnimatedComponent(IconClass);

class AddItemInput extends React.Component {
    state = {value: ''};
    _color = new Animated.Value(0);
    _textInput = null;

    setValue = (value) => {
        this.setState({value});
    };

    onSubmitEditing = () => {
        if (!this.state.value) {
            return this._textInput.blur();
        }

        this.props.onSubmit(this.state.value);
        this.setValue('');
    };

    handlePlusClick = () => {
        if (!this._textInput.isFocused()) {
            this._textInput.focus();
        } else if (this.state.value) {
            this.onSubmitEditing()
        }
    };

    onFocusChange = focused => {
        if (!focused && this.props.onBlur) {
            this.props.onBlur();
        } else if (focused && this.props.onFocus) {
            this.props.onFocus();
        }

        Animated.timing(this._color, {
            duration: 200,
            toValue: focused ? 1 : 0
        }).start();
    };

    focus() {
        this._textInput.focus()
    }

    render() {
        const iconColor = this.state.value ? '#13b70b' : this._color.interpolate({
            inputRange: [0, 1],
            outputRange: ['#dfdfdf', '#afafaf'],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.container}>
                <TextInput
                    ref={ref => this._textInput = ref}
                    style={styles.input}
                    placeholder="מה צריך?"
                    placeholderTextColor={'#dfdfdf'}
                    controlled
                    value={this.state.value}
                    onChange={e => this.setValue(e.nativeEvent.text)}
                    onFocus={() => this.onFocusChange(true)}
                    onBlur={() => this.onFocusChange(false)}
                    blurOnSubmit={false}
                    onSubmitEditing={this.onSubmitEditing}
                />
                <TouchableWithoutFeedback onPress={this.handlePlusClick}>
                    <AnimatedIcon
                        size={32}
                        name="plus"
                        type="feather"
                        color={iconColor}
                        containerStyle={styles.icon}
                    />
                </TouchableWithoutFeedback>
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
        paddingRight: 20,
        paddingLeft: 10,
        width: 70,
        height: 60
    },
    input: {
        flex: 1,
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
    onSubmit: value => dispatch(addItem(value))
});

export default connect(null, mapDispatchToProps, null, {withRef: true})(AddItemInput);