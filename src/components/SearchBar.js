import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ term, onChangeText, keyboardType = 'default', placeholder, style = {} }) => {
    return <View style={[styles.background, style]}>
        <Icon
            name='search'
            size={20}
            color='black'
            style={styles.icon}
        />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={term}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    </View>
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#d3d3d3',
        height: 45,
        borderRadius: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 16,
        flex: 1,
        color: 'black'
    },
    icon: {
        marginStart: 20,
        marginEnd: 5
    }
});

export default SearchBar;