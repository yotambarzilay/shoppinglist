import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const EmptyListView = ({onPress, showAddButton}) => (
    <View style={styles.container}>
        {
            showAddButton
                ?   <TouchableOpacity key="add" onPress={onPress}>
                        <Icon color="#cfcfcf" type="feather" name="plus" size={56}/>
                    </TouchableOpacity>
                :   <View>
                        <Text style={styles.title}>הרשימה ריקה</Text>
                    </View>
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#cfcfcf',
        fontSize: 26,
        height: 56,
        transform: [{translateY: 28}]
    }
})

export default EmptyListView;