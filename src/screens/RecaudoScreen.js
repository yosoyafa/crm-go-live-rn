import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Geolocation from '@react-native-community/geolocation';

import Context from '../context/Context';

const RecaudoScreen = ({ navigation, route }) => {

    const { recaudo } = useContext(Context);

    const { contrato } = route.params;

    const [valor, setValor] = useState('');
    const [description, setDescription] = useState('');
    const [pos, setPos] = useState({ lat: 0, lon: 0 });
    const [loading, setLoading] = useState(false);

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
                            icon="printer"
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            onPress={() => console.log('print')}>
                            Imprimir
                        </Button>
                        <Button
                            disabled={!(!!description && !!valor)}
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            icon="currency-usd"
                            mode="outlined"
                            onPress={() => {
                                setLoading(true);
                                Geolocation.getCurrentPosition(info => setPos({ lat: info?.coords?.latitude, lon: info?.coords?.longitude }));
                                const today = new Date();
                                recaudo(false, pos.lat, pos.lon, contrato.numero_documento, valor.substring(1), `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`, description, 'Efectivo')
                                    .then(() => setLoading(false));
                            }}>
                            Pagar
                                </Button>
                    </View>
                </View>
            </ScrollView>
            <Modal transparent visible={loading}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
                        <ActivityIndicator size="large" color="#96158C" />
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
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