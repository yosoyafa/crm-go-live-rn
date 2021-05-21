import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingActionButton = ({ icon, onPress, style = {} }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, { ...style }]}
        >
            <Icon name={icon} color='white' size={30} />
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        backgroundColor: '#96158C',
        borderRadius: 999,
        position: 'absolute',
        right: 16,
        bottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    icon: {
        tintColor: 'white',
        resizeMode: 'contain',
        width: 30,
        height: 30
    }
});

export default FloatingActionButton;