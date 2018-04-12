import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon, Divider } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';
 
const styles = StyleSheet.create({
    swipeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: 'red'
    },
    label: {
        color: 'white',
        paddingLeft: 12,
        fontSize: 18
    }
});
const leftContent = (
    <View style={styles.swipeContainer}>
        <Icon name="delete" color="white" />
        <Text style={styles.label}>Pull to activate</Text>
    </View>
);

class Item extends React.Component {
    render() {
        const {id, label} = this.props.item;
        return (
            <Swipeable  leftContent={leftContent} 
                        rightContent={leftContent}
                        onLeftActionActivate={() => this.setState({leftActionActivated: true})}
                        onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
                        onRightActionRelease={() => this.props.removeItem(id)}>
                <ListItem
                    hideChevron
                    key={`item_${id}`}
                    title={label}
                    roundAvatar
                    leftIcon={{ name: 'flight-takeoff', color: '#d4d6d8' }}
                />
                <Divider style={{ backgroundColor: '#d4d6d8' }} />
            </Swipeable>
        );
    }
}

export default Item;