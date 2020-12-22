import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';

const EdicionScreen = ({ navigation, route }) => {

    const { contrato } = route.params;

    const [valor, setValor] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log(contrato);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>edicion</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        zIndex: 999,
        backgroundColor: 'white',
        borderRadius: 7,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 10,
        elevation: 2,
        padding: 20
    },
});

export default EdicionScreen;