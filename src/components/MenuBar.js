import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const MenuBar = ({ menuOnPress, buttons = [] }) => {
    return (
        <View style={styles.header}>
            <IconButton
                icon="menu"
                size={30}
                onPress={menuOnPress}
            />
            <View style={{ flexDirection: 'row' }}>
                {buttons.map((button, i) => {
                    return (
                        <IconButton
                            key={i}
                            icon={button.name}
                            size={30}
                            onPress={button.onPress}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: 20
    },
});

export default MenuBar;