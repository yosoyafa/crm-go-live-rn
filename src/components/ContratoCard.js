import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ContratoCard = ({ item, last }) => {

    const [optionsVisible, setOptionsVisible] = useState(false);

    return (
        /*  contrato: '9991',
            nombre: 'cliente 1',
            cedula: '123',
            valor: '123'
        */
        <View>
            <View style={styles.card} >
                <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={() => { setOptionsVisible(!optionsVisible) }}>
                    <View style={{ flex: 1, margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Contrato: {item.contrato}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.nombre}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.cedula}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>${item.valor}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {optionsVisible && <View style={[styles.options, last ? { marginBottom: 10 } : null]}>
                <Button
                    onPress={() => console.log('cobro')}
                    color='white'>
                    COBRO
                    </Button>
                <Button
                    onPress={() => console.log('gestion')}
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 10
    },
    options: {
        flexDirection: 'row-reverse',
        backgroundColor: 'purple',
        borderRadius: 7,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        marginTop: -20
    }
});

export default ContratoCard;