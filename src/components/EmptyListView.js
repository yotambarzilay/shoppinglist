import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const EmptyView = ({onPress}) => (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>הוספה</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
            <Icon color="#9f9f9f" type="feather" name="plus" size={56} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#9f9f9f',
        fontSize: 26,
        marginBottom: 30
    }
})

export default EmptyView;