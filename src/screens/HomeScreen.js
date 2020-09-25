import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import SearchBar from '../components/SearchBar';
import { IconButton } from 'react-native-paper';

const HomeScreen = () => {
    const [term, setTerm] = useState('');
    //Geolocation.getCurrentPosition(info => console.log(info));

    const data = [
        {
            contrato: '9991',
            nombre: 'cliente 1',
            cedula: '123',
            valor: '12000'
        },
        {
            contrato: '9992',
            nombre: 'cliente 1',
            cedula: '123',
            valor: '12000'
        },
        {
            contrato: '9993',
            nombre: 'cliente 1',
            cedula: '123',
            valor: '12000'
        },
        {
            contrato: '9994',
            nombre: 'cliente 1',
            cedula: '123',
            valor: '12000'
        },
        {
            contrato: '9995',
            nombre: 'cliente 1',
            cedula: '123',
            valor: '12000'
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="menu"
                    size={30}
                    onPress={() => console.log('Pressed')}
                />
                <IconButton
                    icon="sync"
                    size={30}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <SearchBar
                onChangedTerm={setTerm}
                onSubmitTerm={() => {
                    if (term) {
                        //searchMovie(term)
                    }
                }}
            />
            <FlatList
                data={data}
                keyExtractor={(item) => item.contrato}
                renderItem={({ item, index }) => {
                    return (
                        /*  contrato: '9991',
                            nombre: 'cliente 1',
                            cedula: '123',
                            valor: '123'
                        */
                        <View style={styles.card} >
                            <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={() => { console.log(1) }}>
                                <View style={{ flex: 1, margin: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Contrato: {item.contrato}</Text>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.nombre}</Text>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>{item.cedula}</Text>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#009366', marginBottom: 5 }}>${item.valor}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginVertical: 10,
    },
})

export default HomeScreen;