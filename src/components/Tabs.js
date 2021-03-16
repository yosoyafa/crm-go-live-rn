import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tabs = ({ active, setActive, tabs = [], style = {} }) => {
    return (
        <View style={{ flexDirection: 'row', width: '100%' }}>
            {
                tabs.map((item, index) => {
                    return <TouchableOpacity key={index} onPress={() => setActive(index)} style={index === active ? styles.activeTab : styles.inactiveTab}>
                        <Text style={index === active ? styles.activeText : styles.inactiveText}>{item.title}</Text>
                        <View style={{ width: '72%', height: 3, backgroundColor: index === active ? '#96158C' : 'transparent', position: 'absolute', bottom: 0 }}></View>
                    </TouchableOpacity>
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    activeTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    inactiveTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    activeText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 21
    },
    inactiveText: {
        color: '#96989C',
        fontSize: 18,
        lineHeight: 21
    }
});

export default Tabs;