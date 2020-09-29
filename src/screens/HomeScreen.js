import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import SearchBar from '../components/SearchBar';
import { IconButton } from 'react-native-paper';
import Context from '../context/Context';
import ContratoCard from '../components/ContratoCard';

const HomeScreen = ({ navigation }) => {
    const [term, setTerm] = useState('');
    //Geolocation.getCurrentPosition(info => console.log(info));

    const contratos = [
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
                    onPress={() => navigation.toggleDrawer()}
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
                data={contratos}
                keyExtractor={(item) => item.contrato}
                renderItem={({ item, index, }) => {
                    if (contratos.length === index + 1) {
                        return <ContratoCard item={item} last={true} />
                    }
                    return <ContratoCard item={item} last={false} />
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
        marginTop: 10,
    },
})

export default HomeScreen;