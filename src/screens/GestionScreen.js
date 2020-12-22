import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Picker, Switch, SafeAreaView, ScrollView, Modal, ActivityIndicator, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton, Button } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Geolocation from '@react-native-community/geolocation';

import Context from '../context/Context';

const GestionScreen = ({ navigation, route }) => {

    const { gestion } = useContext(Context);

    const { contrato } = route.params;

    const [selectedValue, setSelectedValue] = useState('');
    const [description, setDescription] = useState('');
    const [valor, setValor] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pos, setPos] = useState({ lat: 0, lon: 0 });

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //DATE
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [payDate, setPayDate] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setPayDate(date.toDateString());
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


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.card}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#96158C' }}>{contrato.name}</Text>
                    <Text>CC: {contrato.numero_documento}</Text>

                    <View style={{ borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginVertical: 20 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: '100%' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Titular se contacta" value="1" />
                            <Picker.Item label="Mensaje con tercero" value="2" />
                            <Picker.Item label="No hay contacto" value="3" />
                            <Picker.Item label="Retiro" value="4" />
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
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Text>Acuerdo de pago</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#96158C" }}
                            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    {isEnabled && <>
                        <TextInput
                            theme={{
                                colors: {
                                    primary: '#96158C',
                                }
                            }}
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
                    <Button
                        theme={{
                            colors: {
                                primary: '#96158C',
                            }
                        }}
                        icon="content-save"
                        mode="contained"
                        onPress={() => {
                            setLoading(true);
                            Geolocation.getCurrentPosition(info => setPos({ lat: info?.coords?.latitude, lon: info?.coords?.longitude }));
                            const today = new Date();
                            gestion(false, pos.lat, pos.lon, contrato.numero_documento, 'GestionAPP', `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`, isEnabled ? '1' : '0', payDate, valor, description, selectedValue)
                                .then(() => setLoading(false));
                        }}>
                        Guardar
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

export default GestionScreen;