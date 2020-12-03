import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const Context = React.createContext();

export const Provider = ({ children }) => {

    const [logged, setLogged] = useState('0');
    const [invitado, setInvitado] = useState('0');
    const [usuario, setUsuario] = useState(null);
    const [obituario, setObituario] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [numeroEmergencia, setNumeroEmergencia] = useState('018000915286');

    const [cartera, setCartera] = useState({});
    const [user, setUser] = useState('');

    const setUp = async () => {
        try {
            const mLogged = await AsyncStorage.getItem('logged');
            if (mLogged !== null) {
                setLogged((mLogged));
            }
        } catch (e) {
            console.warn('error en setUp, logged', e);
        }
        try {
            const mUser = await AsyncStorage.getItem('user');
            if (mUser !== null) {
                setUser(JSON.parse(mUser));
            }
        } catch (e) {
            console.warn('error en setUp, user', e);
        }
        try {
            const mCartera = await AsyncStorage.getItem('cartera');
            if (mCartera !== null) {
                setCartera(JSON.parse(mCartera));
            }
        } catch (e) {
            console.warn('error en setUp, cartera', e);
        }
    }

    const modifyUser = async value => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue);
            setUser(value)
        } catch (e) {
            console.warn('error en modifyUser', e);
        }
    }

    const modifyLogged = async value => {
        try {
            await AsyncStorage.setItem('logged', value);
            setLogged(value);
        } catch (e) {
            console.warn('error en modifyLogged', e);
        }
    }

    const modifyCartera = async cartera => {
        try {
            await AsyncStorage.setItem('cartera', JSON.stringify(cartera));
            setCartera(cartera);
        } catch (error) {
            console.warn(`error modificando cartera: ${error}`)
        }
    }

    const login = async (user, md5, lat, lon, fecha) => {
        try {
            let response = await fetch(`https://integracionip.com/app/getUser.php?user_name=${user}&latitud=${lat}&longitud=${lon}&fecha=${fecha}`);
            let resp = await response.json();
            if (resp.user_name !== 'Usuario NO Autorizado para APP' && md5 === resp.user_hash) {
                modifyLogged('1');
                modifyUser(resp);
            } else {
                if (resp.user_name === 'Usuario NO Autorizado para APP') {
                    Alert.alert('Error', resp.user_name);
                } else {
                    Alert.alert('Error', 'Usuario o contraseña incorrecta');
                }
            }
        } catch (error) {
            console.error('error en login', error);
            Alert.alert('Error', 'Revisa tu conexión a internet');
        }
    };

    const downloadCartera = async (id) => {
        if (id) {
            try {
                let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getCartera1.php?user_id=${id}`);
                console.log(response);
                let json = await response.json();
                const today = new Date();
                const mCartera = {
                    fecha: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
                    contratos: json
                }
                modifyCartera(mCartera);
            } catch (error) {
                console.error('error en downloadcartera', error);
            }
        }
    };

    const recaudo = async (lat, lon, cc, valor, fecha, observacion, fdp) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getRecaudos.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&valorrecaudo=${valor}&id=${user.id}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&detallerecaudo=${observacion}&forma_de_pago=${fdp}`);
            let json = await response.json();
            console.log(json);
        } catch (error) {
            console.error('error en recaudo', error);
        }
    }

    const gestion = async (lat, lon, cc, tipoGestion, fecha, acuerdo, fechaAcuerdo, valorAcuerdo, descripcion, resultadoGestion) => {
        try {
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getGestionCartera.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&tipo_gestion=${tipoGestion}&fecha=${fecha}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&acuerdo_pago=${acuerdo}&fechaAcuerdo=${fechaAcuerdo}&valor_acuerdo=${valorAcuerdo}&descripcion=${descripcion}&resultado_gestion=${resultadoGestion}&user_id=${user.id}`);
            let json = await response.json();
            console.log(json);
        } catch (error) {
            console.error('error en recaudo', error);
        }
    }

    return (
        <Context.Provider value={{
            setUp,
            downloadCartera,
            login,
            modifyCartera,
            modifyLogged,
            modifyUser,
            recaudo,
            cartera,
            logged,
            user,
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;