import React from 'react';
import {StyleSheet, SafeAreaView, View, Animated} from 'react-native';
import ItemsList from './ItemsList';
import FadeScaleAnimation from './FadeScaleAnimation';
import EmptyListView from './EmptyListView';
import AddItemInput from './AddItemInput';

class ShoppingListView extends React.Component {
    _input = null;
    state = {
        focused: false
    };

    constructor(props) {
        super(props);

        this._animated = new Animated.Value(this.props.noItems ? 0 : 1);
    }

    fade(toValue) {
        Animated.timing(this._animated, {
            toValue,
            duration: 250
        }).start();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.noItems && !this.state.focused && (prevState.focused || !prevProps.noItems)) {
            this.fade(0);
        } else if (prevProps.noItems && !this.props.noItems || this.props.noItems && !prevState.focused && this.state.focused) {
            this.fade(1);
        }
    }

    render() {
        const {noItems} = this.props;

        return (
            <View style={styles.container}>
                <FadeScaleAnimation>
                    {noItems
                        ? <EmptyListView key="emptyView"
                                         showAddButton={!this.state.focused}
                                         onPress={() => this._input.focus()}
                        />
                        : null
                    }
                </FadeScaleAnimation>
                {noItems ? null : <ItemsList key="itemsList"/>}
                <Animated.View style={[styles.footer, {opacity: this._animated}]}>
                    <SafeAreaView>
                        <AddItemInput ref={ref => this._input = ref && ref.getWrappedInstance()}
                                      onFocus={() => this.setState({focused: true})}
                                      onBlur={() => this.setState({focused: false})}

                        />

                    </SafeAreaView>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        backgroundColor: '#f9f9f9'
    }
});

import {connect} from 'react-redux';

const mapStateToProps = ({items}) => ({
    noItems: !items.length
});

export default connect(mapStateToProps, {})(ShoppingListView);