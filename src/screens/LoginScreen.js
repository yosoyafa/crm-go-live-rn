import React, { useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import md5 from 'md5';

import Context from '../context/Context';

const LoginScreen = () => {

    const { login } = useContext(Context);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [pos, setPos] = useState({ lat: 0, lon: 0 });

    const mLogin = () => {
        Geolocation.getCurrentPosition(info => setPos({ lat: info?.coords?.latitude, lon: info?.coords?.longitude }));
        const today = new Date();
        login(user.toLowerCase(), md5(password), pos.lat, pos.lon, `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                <View style={{ marginBottom: 32 }}>
                    <TextInput
                        theme={{
                            colors: {
                                primary: '#96158C',
                            }
                        }}
                        style={{ marginBottom: 16 }}
                        label="Usuario"
                        value={user}
                        mode='outlined'
                        onChangeText={text => setUser(text)}
                    />
                    <TextInput
                        theme={{
                            colors: {
                                primary: '#96158C',
                            }
                        }}
                        secureTextEntry
                        label="Contraseña"
                        value={password}
                        mode='outlined'
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <Button
                    theme={{
                        colors: {
                            primary: '#96158C',
                        }
                    }}
                    onPress={mLogin}
                    disabled={!user || !password}
                    mode='contained'
                >Iniciar sesion</Button>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({

});

export default LoginScreen;