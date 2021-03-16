import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Modal, ActivityIndicator, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Geolocation from '@react-native-community/geolocation';

import Context from '../context/Context';
import moment from 'moment';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

const RecaudoScreen = ({ navigation, route }) => {

    const { recaudo, bleOpened, parametrosRecaudo } = useContext(Context);

    const { contrato } = route.params;

    const [valor, setValor] = useState('');
    const [description, setDescription] = useState('');
    const [pos, setPos] = useState({ lat: 0, lon: 0 });
    const [loading, setLoading] = useState(false);
    const [numeroRecibo, setNumeroRecibo] = useState('');

    const createTicket = () => `
${!!parametrosRecaudo[0]?.valorparametro ? parametrosRecaudo[0]?.valorparametro : ''}
${!!parametrosRecaudo[1]?.valorparametro ? parametrosRecaudo[1]?.valorparametro : ''}
Fecha: ${moment().format('DD-MM-YYYY HH:mm:ss')}

Vigencia desde: ${contrato.vigenciadesde}
Vigencia hasta: ${contrato.vigenciahasta}
Valor vig. contrato: $${contrato.valorcontrato}
Periodicidad pago: ${contrato.periodicidad1}

--------------------------------------
RECIBO DE CAJA
${numeroRecibo}
Contrato Nro: ${contrato.numeropoliza}
Tipo de Registro: Recaudo
Pagado Por:
    Dto: ${contrato.numero_documento}
    ${contrato.name}
ValorRecaudado: ${valor}
Forma de Pago: Efectivo
Observaciones: ${description}
--------------------------------------

${!!parametrosRecaudo[2]?.valorparametro ? parametrosRecaudo[2]?.valorparametro : ''}
${!!parametrosRecaudo[3]?.valorparametro ? parametrosRecaudo[3]?.valorparametro : ''}
${!!parametrosRecaudo[4]?.valorparametro ? parametrosRecaudo[4]?.valorparametro : ''}
${!!parametrosRecaudo[5]?.valorparametro ? parametrosRecaudo[5]?.valorparametro : ''}
${!!parametrosRecaudo[6]?.valorparametro ? parametrosRecaudo[6]?.valorparametro : ''}







`;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.card}>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#96158C' }}>{contrato.name}</Text>
                        <Text>CC: {contrato.numero_documento}</Text>
                        <Text>Contrato: {contrato.numeropoliza}</Text>
                        <Text>Valor contrato: ${contrato.valorcontrato}</Text>
                        <Text>Total cartera: ${contrato.totalcartera}</Text>
                        <Text>Vigencia desde: {contrato.vigenciadesde}</Text>
                        <Text>Vigencia hasta: {contrato.vigenciahasta}</Text>
                        <Text>Periodicidad: {contrato.periodicidad1}</Text>
                    </View>

                    <TextInput
                        style={{ marginBottom: 20 }}
                        theme={{
                            colors: {
                                primary: '#96158C',
                            }
                        }}
                        onChangeText={(text) => setValor(text)}
                        value={valor}
                        keyboardType={'decimal-pad'}
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
                        theme={{
                            colors: {
                                primary: '#96158C',
                            }
                        }}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        label='Descripción'
                        mode='outlined'
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            disabled={!(!!description && !!valor && !!bleOpened && !!numeroRecibo)}
                            icon="printer"
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            onPress={async () => {
                                try {
                                    await BluetoothEscposPrinter.printerInit();
                                    await BluetoothEscposPrinter.printText(createTicket(), {});
                                } catch (e) {
                                    console.log(e);
                                    Alert.alert('Error en impresión', 'Revisa tu conexión con la impresora');
                                }
                            }}>
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
                            mode="contained"
                            onPress={() => {
                                setLoading(true);
                                Geolocation.getCurrentPosition(info => setPos({ lat: info?.coords?.latitude, lon: info?.coords?.longitude }));
                                const now = moment();
                                const nowFormatted = now.clone().format('DD-MM-YYYY hh:mm:ss');
                                recaudo(false, pos.lat, pos.lon, contrato.numero_documento, valor.substring(1), nowFormatted, description, 'Efectivo')
                                    .then(
                                        (out) => {
                                            setLoading(false);
                                            setNumeroRecibo(out.rc)
                                        }
                                    );
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