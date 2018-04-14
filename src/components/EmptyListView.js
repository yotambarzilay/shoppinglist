import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const EmptyView = () => (
    <View style={styles.container}>
        <Icon color="#9f9f9f" type="feather" name="check" size={56} />
        <Text style={styles.label}>יש הכל</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#9f9f9f',
        fontSize: 26,
        marginTop: 10
    }
})

export default EmptyView;