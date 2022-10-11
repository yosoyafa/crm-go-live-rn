import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Picker, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, TextInput, Switch } from 'react-native-paper';

import moment from 'moment';
import call from 'react-native-phone-call'

import Context from '../context/Context';

import direcciones from '../static/direcciones';
import Geolocation from '@react-native-community/geolocation';
import AutocompleteInput from '../components/AutocompleteInput';

const EdicionScreen = ({ navigation, route }) => {

    const { edicion, cartera } = useContext(Context);

    const { contrato, recaudo } = route.params;

    const [loading, setLoading] = useState(false);
    const [editBarrio, setEditBarrio] = useState(false);
    const [pos, setPos] = useState({ lat: 0, lon: 0 });
    const [lista, setLista] = useState(cartera.barrios)

    const [selectedValue, setSelectedValue] = useState('');
    const [viaPrincipal, setViaPrincipal] = useState('');
    const [viaSecundaria, setViaSecundaria] = useState('');
    const [numero, setNumero] = useState('');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [email, setEmail] = useState('');
    const [barrio, setBarrio] = useState({});
    const [indicaciones, setIndicaciones] = useState('');
    const [diaCobro, setDiaCobro] = useState('');
    const [noHayDatosPorActualizar, setNoHayDatosPorActualizar] = useState(false)

    const [query, setQuery] = useState('');

    console.log(contrato)

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = cartera.barrios.filter(item => String(item.barrio).toLowerCase().includes(formattedQuery));
        setLista(filteredData);
        setQuery(text);
    };

    const isDiaCobroValid = () => !(!!diaCobro && !(+diaCobro > 0 && +diaCobro < 32));

    const makeCall = number => {
        const args = {
            number, // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
        }

        call(args).catch(console.error)
    };

    const goToRecaudo = () => navigation.navigate('Recaudo', { contrato })

    const hayNuevosDatos = !!diaCobro || !!indicaciones || !!barrio.barrio || !!num1 || !!num2 || !!email || (selectedValue && viaPrincipal && viaSecundaria && numero)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.container}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#96158C', marginBottom: 8 }}>{contrato.name}</Text>
                    <Text>CC: {contrato.numero_documento}</Text>
                    <Text>Dirección: {contrato.direccion}</Text>
                    <Text>Barrio: {contrato.barrio}</Text>
                    <Text>Indicaciones: {contrato.indicaciones}</Text>
                    <Text onPress={() => { makeCall(contrato.celular1) }}>Teléfono 1: {contrato.celular1}</Text>
                    <Text onPress={() => { makeCall(contrato.celular2) }}>Teléfono 2: {contrato.celular2}</Text>
                    <Text>Correo electrónico: {contrato.email}</Text>
                    <Text>Dia de cobro: {contrato.dia_cobro}</Text>
                    <View style={{ borderRadius: 4, borderWidth: 1, borderColor: 'grey', marginVertical: 20, padding: 10 }}>
                        <Text style={{ marginTop: -21, marginBottom: 10, backgroundColor: '#F2F2F2', width: 80, paddingHorizontal: 10 }}>Direccion</Text>
                        <View style={{ borderRadius: 4, borderWidth: 1, borderColor: 'grey', marginBottom: 10 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 55, width: '100%' }}
                                mode={'dropdown'}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {direcciones.map((item, key) => <Picker.Item key={key} label={item.nombre} value={item.nombre} />)}
                            </Picker>
                        </View>
                        <TextInput
                            theme={{ colors: { primary: '#96158C' } }}
                            style={{ marginBottom: 10 }}
                            numberOfLines={1}
                            onChangeText={p => setViaPrincipal(p)}
                            value={viaPrincipal}
                            label='Vía principal'
                            mode='outlined'
                        />
                        <TextInput
                            theme={{ colors: { primary: '#96158C' } }}
                            style={{ marginBottom: 10 }}
                            numberOfLines={1}
                            onChangeText={p => setViaSecundaria(p)}
                            value={viaSecundaria}
                            label='Vía secundaria'
                            mode='outlined'
                        />
                        <TextInput
                            theme={{ colors: { primary: '#96158C' } }}
                            style={{ marginBottom: 10 }}
                            numberOfLines={1}
                            onChangeText={p => setNumero(p)}
                            value={numero}
                            label='Número'
                            mode='outlined'
                            keyboardType='decimal-pad'
                        />
                        <TouchableOpacity onPress={() => setEditBarrio(true)}>
                            <TextInput
                                editable={false}
                                theme={{ colors: { primary: '#96158C' } }}
                                style={{ marginBottom: 10 }}
                                numberOfLines={1}
                                value={barrio.barrio}
                                label='Barrio'
                                mode='outlined'
                            />
                        </TouchableOpacity>
                        <TextInput
                            theme={{ colors: { primary: '#96158C' } }}
                            numberOfLines={1}
                            onChangeText={p => setIndicaciones(p)}
                            value={indicaciones}
                            label='Indicaciones'
                            mode='outlined'
                        />
                        <Text style={{ marginTop: 10 }}>{`${selectedValue} ${viaPrincipal} # ${viaSecundaria} - ${numero}`}</Text>
                    </View>
                    <TextInput
                        theme={{ colors: { primary: '#96158C' } }}
                        style={{ marginBottom: 20 }}
                        numberOfLines={1}
                        onChangeText={p => setNum1(p)}
                        value={num1}
                        label='Teléfono 1'
                        mode='outlined'
                        keyboardType='decimal-pad'
                    />
                    <TextInput
                        theme={{ colors: { primary: '#96158C' } }}
                        style={{ marginBottom: 20 }}
                        numberOfLines={1}
                        onChangeText={p => setNum2(p)}
                        value={num2}
                        label='Teléfono 2'
                        mode='outlined'
                        keyboardType='decimal-pad'
                    />
                    <TextInput
                        theme={{ colors: { primary: '#96158C' } }}
                        style={{ marginBottom: 20 }}
                        numberOfLines={1}
                        onChangeText={setEmail}
                        value={email}
                        label='Correo electrónico'
                        mode='outlined'
                        keyboardType='email-address'
                    />
                    <View style={{ borderRadius: 4, borderWidth: 1, borderColor: 'grey', marginBottom: 10 }}>
                        {!!diaCobro && < Text style={{ marginTop: -11, backgroundColor: '#F2F2F2', width: 90, paddingHorizontal: 5, marginLeft: 8 }}>Dia de cobro</Text>}
                        <Picker
                            selectedValue={diaCobro}
                            style={{ height: 55, width: '100%' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => { if (itemIndex !== 0) setDiaCobro(itemValue) }}>
                            <Picker.Item label='Día de cobro' value='0' />
                            {dias.map((item, key) => <Picker.Item key={key} label={item + ''} value={item + ''} />)}
                        </Picker>
                    </View>
                    {recaudo && (
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
                            <Text>No hay datos por actualizar</Text>
                            <Switch
                                value={noHayDatosPorActualizar}
                                onValueChange={() => setNoHayDatosPorActualizar(!noHayDatosPorActualizar)}
                                disabled={hayNuevosDatos}
                            />
                        </View>
                    )}
                    <Button
                        theme={{ colors: { primary: '#96158C' } }}
                        icon="content-save"
                        mode="contained"
                        disabled={!hayNuevosDatos && !noHayDatosPorActualizar}
                        onPress={() => {
                            if (noHayDatosPorActualizar) {
                                return goToRecaudo()
                            }
                            setLoading(true);
                            Geolocation.getCurrentPosition(info => setPos({ lat: info?.coords?.latitude, lon: info?.coords?.longitude }));
                            const now = moment();
                            const nowFormatted = now.clone().format('DD-MM-YYYY hh:mm:ss');
                            edicion(false, pos.lat, pos.lon, contrato.numero_documento, nowFormatted, contrato.celular1, !!num1 ? num1 : contrato.celular1, contrato.celular2, !!num2 ? num2 : contrato.celular2, contrato.email, email || contrato.email, contrato.direccion, (!!selectedValue && !!viaPrincipal && !!viaSecundaria && !!numero) ? `${selectedValue} ${viaPrincipal} No. ${viaSecundaria} - ${numero}` : contrato.direccion, contrato.idbarrio, !!barrio.id ? barrio.id : contrato.idbarrio, contrato.indicaciones, !!indicaciones ? indicaciones : contrato.indicaciones, contrato.dia_cobro, !!diaCobro ? diaCobro : contrato.dia_cobro)
                                .then(() => {
                                    setLoading(false)
                                    if (recaudo) goToRecaudo()
                                })
                        }}>
                        {noHayDatosPorActualizar ? 'Siguiente' : 'Guardar'}
                    </Button>
                </View>
            </ScrollView>
            <Modal transparent visible={loading}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
                        <ActivityIndicator size="large" color="#96158C" />
                    </View>
                </View>
            </Modal>
            <Modal transparent visible={editBarrio}>
                <TouchableOpacity onPress={() => setEditBarrio(false)} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000aa' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, marginHorizontal: 20 }}>
                        <AutocompleteInput
                            placeholder='Barrio'
                            data={lista}
                            term={query}
                            onChangedText={setQuery}
                            onChangeText={queryText => handleSearch(queryText)}
                            onSelect={setBarrio}
                            onClose={() => {
                                setEditBarrio(false);
                                setQuery('')
                            }}
                            onCleanUp={() => setQuery('')}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
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

const dias = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];

export default EdicionScreen;