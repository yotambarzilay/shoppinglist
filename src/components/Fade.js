import React from 'react';
import { Animated } from 'react-native';

const fade = (animated, value, cb) => {
    Animated.timing(animated, {
        toValue: value,
        duration: 100
    }).start(cb);
}

class Fade extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unmountingComponent: null
        };

        this._animated = new Animated.Value(0);
        this.measurements = null;
    }

    fadeIn() {
        fade(this._animated, 1);
    }

    fadeOut() {
        fade(this._animated, 0, () => this.setState({unmountingComponent: null}));
    }

    onViewLayout = event => {
        if (!this.props.children) {
            return;
        }

        const {x, y, width, height} = event.nativeEvent.layout;
        this.measurements = {x, y, width, height};
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.children && !nextProps.children) {
            this.setState({unmountingComponent: this.props.children});
        }
    }

    componentDidMount() {
        if (this.props.children) {
            this.fadeIn();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.children && !prevProps.children) {
            this.fadeIn();
        } else if (!this.props.children && prevProps.children) {
            this.fadeOut();
        }
    }

    render() {
        const scale = this._animated.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
            extrapolate: 'clamp'
        });

        const children = this.props.children || this.state.unmountingComponent;

        const style = {
            opacity: this._animated,
            transform: [{scale}]
        };
        if (this.props.children) {
            style.flex = 1;
        } else if (this.state.unmountingComponent) {
            Object.assign(style, {
                position: 'absolute',
                left: 0,
                right: 0,
                top: this.measurements.y,
                height: this.measurements.height
            });
        }

        return (
            <Animated.View style={style} onLayout={this.measurements ? undefined : this.onViewLayout}>
                {children}
            </Animated.View>
        );
    }
}

export default Fade;