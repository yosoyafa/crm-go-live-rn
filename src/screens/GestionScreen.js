import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Picker, Switch, SafeAreaView, ScrollView, Modal, ActivityIndicator, Platform, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton, Button } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';

import Context from '../context/Context';
import { createTicketGestion, print } from '../utils/tools';

const GestionScreen = ({ navigation, route }) => {

    const { gestion, bleOpened, parametrosGestion, cartera: { acciones } } = useContext(Context);

    const { contrato } = route.params;

    const [selectedValue, setSelectedValue] = useState('1');
    const [description, setDescription] = useState('');
    const [valor, setValor] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pos, setPos] = useState({ lat: 0, lon: 0 });
    const [numeroRecibo, setNumeroRecibo] = useState('');
    const [disableFields, setDisableFields] = useState(false)

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setValor('');
        setPayDate('');
    };

    //DATE
    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [payDate, setPayDate] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        const payDateFormatted = `${('' + date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate()}-${(date.getMonth() + 1 + '').length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getFullYear()}`;
        setPayDate(payDateFormatted);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const isDisabled = () => {
        if (!!numeroRecibo) {
            //console.log(numeroRecibo)
            return true;
        }
        if (isEnabled) {
            return !(description && valor && payDate);
        } else {
            return !description;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.card}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#96158C' }}>{contrato.name}</Text>
                    <Text>CC: {contrato.numero_documento}</Text>

                    <View style={{ borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginVertical: 20, backgroundColor: '#f6f6f6' }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: '100%' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            {acciones.map((accion) => (
                                <Picker.Item key={accion.nombre} label={accion.nombre} value={accion.id} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput
                        theme={{
                            colors: {
                                primary: '#96158C',
                            }
                        }}
                        style={{ marginBottom: 20 }}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        label='Descripción'
                        mode='outlined'
                        disabled={disableFields}
                        editable={!disableFields}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Text>Acuerdo de pago</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#96158C" }}
                            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            disabled={disableFields}
                        />
                    </View>

                    {isEnabled && <>
                        <TextInput
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            disabled={disableFields}
                            editable={!disableFields}
                            style={{ marginBottom: 20 }}
                            onChangeText={(text) => setValor(text)}
                            value={valor}
                            label='Valor a pagar'
                            mode='outlined'
                            keyboardType='decimal-pad'
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask="$[000000000]"
                                />
                            }
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput
                                style={{ paddingVertical: 20, flex: 1 }}
                                value={payDate}
                                editable={false}
                                onChange={onChange}
                                label='Fecha de pago'
                                mode='outlined'
                            />
                            <IconButton
                                icon="calendar"
                                size={30}
                                onPress={showDatepicker}
                                disabled={disableFields}
                            />
                        </View>
                        {show && <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />}
                    </>}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            disabled={!(!!bleOpened && !!numeroRecibo)}
                            icon="printer"
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            onPress={() => print(createTicketGestion(contrato, numeroRecibo, description, parametrosGestion))}
                        >
                            Imprimir
                        </Button>
                        <Button
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
                            icon="content-save"
                            mode="contained"
                            disabled={isDisabled()}
                            onPress={() => {
                                setLoading(true);
                                Geolocation.getCurrentPosition(info => setPos({ lat: info?.coords?.latitude, lon: info?.coords?.longitude }));
                                const now = moment();
                                const nowFormatted = now.clone().format('DD-MM-YYYY hh:mm:ss');
                                gestion(false, pos.lat, pos.lon, contrato.numero_documento, 'GestionAPP', nowFormatted, isEnabled ? '1' : '0', payDate, valor.substring(1), description, selectedValue)
                                    .then(
                                        (out) => {
                                            setLoading(false);
                                            setNumeroRecibo(out.rc);
                                            setDisableFields(true)
                                        }
                                    );
                            }}>
                            Guardar
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

export default GestionScreen;