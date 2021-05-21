import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const ContratoCard = ({ item, last, gestion, recaudo, edicion, optionsVisible, setOptionsVisible }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.card} >
                <IconButton
                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}
                    icon="cog"
                    size={25}
                    onPress={edicion}
                />
                <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={() => { setOptionsVisible(item.numeropoliza) }}>
                    <View style={{ flex: 1, margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#96158C', marginBottom: 5 }}>{item.numeropoliza}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>{item.name}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>CC: {item.numero_documento}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>${item.totalcartera}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {optionsVisible && <View style={[styles.options, last ? { marginBottom: 10 } : null]}>
                <Button
                    onPress={recaudo}
                    color='white'>
                    RECAUDO
                    </Button>
                <Button
                    onPress={gestion}
                    color='white'>
                    GESTION
                </Button>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        zIndex: 999,
        backgroundColor: 'white',
        borderRadius: 7,
        marginTop: 15,
        marginBottom: 10,
        elevation: 2,
        //marginHorizontal: 20,
    },
    options: {
        flexDirection: 'row-reverse',
        backgroundColor: 'purple',
        borderRadius: 7,
        paddingTop: 10,
        marginTop: -20,
        elevation: 2,
        //marginHorizontal: 20,
    }
});

export default ContratoCard;