import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';

const RecaudoScreen = ({ navigation, route }) => {

    const { contrato } = route.params;

    const [valor, setValor] = useState('');
    const [description, setDescription] = useState('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.card}>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#96158C' }}>{contrato.name}</Text>
                        <Text>CC: {contrato.numero_documento}</Text>
                    </View>

                    <TextInput
                        style={{ marginBottom: 20 }}
                        onChangeText={(text) => setValor(text)}
                        value={valor}
                        keyboardType={'numbers-and-punctuation'}
                        label='Valor a pagar'
                        mode='outlined'
                        render={props =>
                            <TextInputMask
                                {...props}
                                mask="$[000000000]"
                            />
                        }
                    />

                    <TextInput
                        style={{ marginBottom: 20 }}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        label='Descripción'
                        mode='outlined'
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            disabled={!(!!description && !!valor)}
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            icon="currency-usd"
                            mode="outlined"
                            onPress={() => console.log('Pressed')}>
                            Pagar
                        </Button>
                        <Button
                            disabled={!(!!description && !!valor)}
                            icon="printer"
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            onPress={() => console.log('Pressed')}>
                            Imprimir
                        </Button>
                    </View>
                </View>
            </ScrollView>
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

export default RecaudoScreen;