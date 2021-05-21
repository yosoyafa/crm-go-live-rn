import React, { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const Context = React.createContext();

export const Provider = ({ children }) => {

    const [logged, setLogged] = useState('0');
    const [cartera, setCartera] = useState({});
    const [history, setHistory] = useState({});
    const [user, setUser] = useState('');
    const [find, setFind] = useState([]);

    const [recaudosOffline, setRecaudosOffline] = useState([]);
    const [gestionesOffline, setGestionesOffline] = useState([]);
    const [edicionesOffline, setEdicionesOffline] = useState([]);
    const [syncedRecIds, setSyncedRecIds] = useState([]);
    const [syncedGesIds, setSyncedGesIds] = useState([]);
    const [syncedEdiIds, setSyncedEdiIds] = useState([]);

    const [parametrosRecaudo, setParametrosRecaudo] = useState([]);
    const [parametrosGestion, setParametrosGestion] = useState([]);

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

        try {
            const mHistory = await AsyncStorage.getItem('history');
            if (mHistory !== null) {
                setHistory(JSON.parse(mHistory));
            }
        } catch (e) {
            console.warn('error en setUp, history', e);
        }
        ////
        try {
            const mRecaudosOffline = await AsyncStorage.getItem('recaudosOffline');
            if (mRecaudosOffline !== null) {
                setRecaudosOffline(JSON.parse(mRecaudosOffline));
            }
        } catch (e) {
            console.warn('error en setUp, recsOff', e);
        }

        try {
            const mGestionesOffline = await AsyncStorage.getItem('gestionesOffline');
            if (mGestionesOffline !== null) {
                setGestionesOffline(JSON.parse(mGestionesOffline));
            }
        } catch (e) {
            console.warn('error en setUp, gesOff', e);
        }

        try {
            const mEdicionesOffline = await AsyncStorage.getItem('edicionesOffline');
            if (mEdicionesOffline !== null) {
                setEdicionesOffline(JSON.parse(mEdicionesOffline));
            }
        } catch (e) {
            console.warn('error en setUp, ediOff', e);
        }
        ////
        try {
            const mParametrosRecaudo = await AsyncStorage.getItem('parametrosRecaudo');
            if (mParametrosRecaudo !== null) {
                setParametrosRecaudo(JSON.parse(mParametrosRecaudo));
            }
        } catch (e) {
            console.warn('error en setUp, parametrosRecaudo', e);
        }

        try {
            const mParametrosGestion = await AsyncStorage.getItem('parametrosGestion');
            if (mParametrosGestion !== null) {
                setParametrosGestion(JSON.parse(mParametrosGestion));
            }
        } catch (e) {
            console.warn('error en setUp, parametrosGestion', e);
        }

        SplashScreen.hide();
    };

    //STORAGE

    const modifyUser = async value => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue);
            setUser(value);
        } catch (e) {
            console.warn('error en modifyUser', e);
        }
    };

    const modifyLogged = async value => {
        try {
            await AsyncStorage.setItem('logged', value);
            setLogged(value);
        } catch (e) {
            console.warn('error en modifyLogged', e);
        }
    };

    const modifyCartera = async cartera => {
        try {
            await AsyncStorage.setItem('cartera', JSON.stringify(cartera));
            setCartera(cartera);
        } catch (error) {
            console.warn(`error modificando cartera: ${error}`)
        }
    };

    const modifyHistory = async history => {
        try {
            await AsyncStorage.setItem('history', JSON.stringify(history));
            setHistory(history);
        } catch (error) {
            console.warn(`error modificando history: ${error}`)
        }
    };

    const modifyParametrosRecaudo = async params => {
        try {
            await AsyncStorage.setItem('parametrosRecaudo', JSON.stringify(params));
            setParametrosRecaudo(params);
        } catch (error) {
            console.warn(`error modificando parametros recaudo: ${error}`)
        }
    };

    const modifyParametrosGestion = async params => {
        try {
            await AsyncStorage.setItem('parametrosGestion', JSON.stringify(params));
            setParametrosGestion(params);
        } catch (error) {
            console.warn(`error modificando parametros gestion: ${error}`)
        }
    };

    const modifyRecaudosOffline = async recaudos => {
        try {
            await AsyncStorage.setItem('recaudosOffline', JSON.stringify(recaudos));
            setRecaudosOffline(recaudos);
        } catch (error) {
            console.warn(`error modificando recaudosOffline: ${error}`)
        }
    };

    const modifyGestionesOffline = async gestiones => {
        try {
            await AsyncStorage.setItem('gestionesOffline', JSON.stringify(gestiones));
            setGestionesOffline(gestiones);
        } catch (error) {
            console.warn(`error modificando gestionesOffline: ${error}`)
        }
    };

    const getGestionesOffline = async () => {
        try {
            const mGestionesOffline = await AsyncStorage.getItem('gestionesOffline');
            if (mGestionesOffline !== null) {
                return JSON.parse(mGestionesOffline);
            }
        } catch (e) {
            console.warn('error en gestionesOffline', e);
            return [];
        }
    };

    const modifyEdicionesOffline = async ediciones => {
        try {
            await AsyncStorage.setItem('edicionesOffline', JSON.stringify(ediciones));
            setEdicionesOffline(ediciones);
        } catch (error) {
            console.warn(`error modificando edicionesOffline: ${error}`)
        }
    };

    const getEdicionesOffline = async () => {
        try {
            const mEdicionesOffline = await AsyncStorage.getItem('edicionesOffline');
            if (mEdicionesOffline !== null) {
                return JSON.parse(mEdicionesOffline);
            }
        } catch (e) {
            console.warn('error en edicionesOffline', e);
            return [];
        }
    };

    const getRecaudosOffline = async () => {
        try {
            const mRecaudosOffline = await AsyncStorage.getItem('recaudosOffline');
            if (mRecaudosOffline !== null) {
                return JSON.parse(mRecaudosOffline);
            }
        } catch (e) {
            console.warn('error en getRecaudosOffline', e);
            return [];
        }
    };

    //API CALLS

    const login = async (user, md5, lat, lon, fecha) => {
        try {
            let response = await fetch(`https://integracionip.com/app/getUser.php?user_name=${user}&latitud=${lat}&longitud=${lon}&fecha=${fecha}&nueva=${1}`);
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
                console.log(`https://ws.crmolivosvillavicencio.com/app/getCartera1.php?user_id=${id}`);
                let responseContratos = await fetch(`https://ws.crmolivosvillavicencio.com/app/getCartera1.php?user_id=${id}`);
                let contratos = await responseContratos.json();

                let responseBarrios = await fetch(`https://ws.crmolivosvillavicencio.com/app/getBarrio.php`);
                let barrios = await responseBarrios.json();

                const today = new Date();
                const mCartera = {
                    fecha: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
                    contratos,
                    barrios
                }
                modifyCartera(mCartera);
            } catch (error) {
                console.error('error en downloadcartera', error);
            }
        }
    };

    const getHistory = async (id) => {
        if (id) {
            try {
                console.log(`https://ws.crmolivosvillavicencio.com/app/getHistorialRecaudos.php?user_id=${id}`);
                let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getHistorialRecaudos.php?user_id=${id}`);
                let recaudos = await response.json();

                console.log(`https://ws.crmolivosvillavicencio.com/app/getHistorialGestiones.php?user_id=${id}`);
                let responseG = await fetch(`https://ws.crmolivosvillavicencio.com/app/getHistorialGestiones.php?user_id=${id}`)
                let gestiones = await responseG.json();

                const today = new Date();
                const mHistory = {
                    fecha: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
                    recaudos: recaudos.slice().reverse(),
                    gestiones: gestiones.slice().reverse()
                }
                modifyHistory(mHistory);
            } catch (error) {
                console.error('error en getHistory', error);
            }
        }
    };

    const findCC = async (cc, id) => {
        try {
            console.log(`https://ws.crmolivosvillavicencio.com/app/getCarterabyCedula.php?user_id=${id}+&NumeroDocumento=${cc}`);
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getCarterabyCedula.php?user_id=${id}+&NumeroDocumento=${cc}`);
            let json = await response.json();
            if (json) {
                setFind(json);
            } else {
                Alert.alert('Error', 'No se encontró la cédula');
            }
            //console.log(response);
            //console.log(json);
        } catch (error) {
            console.error('error en findCC', error);
            Alert.alert('Error', 'No se encontró la cédula')
        }
    };

    const recaudoOffline = async (silent = false, lat, lon, cc, valor, fecha, observacion, fdp, isSync = false) => {
        try {
            console.log(`https://ws.crmolivosvillavicencio.com/app/getRecaudosOff.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&valorrecaudo=${valor}&id=${user.id}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&detallerecaudo=${observacion}&forma_de_pago=${fdp}&nueva=${1}`)
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getRecaudosOff.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&valorrecaudo=${valor}&id=${user.id}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&detallerecaudo=${observacion}&forma_de_pago=${fdp}&nueva=${1}`);
            let json = await response.json();
            if (json.estado === 'successful') {
                if (!isSync) Alert.alert('Éxito', 'Recaudo exitoso');
                return { result: true, rc: json.NumeroRecibo };
            } else {
                if (!isSync) Alert.alert('Error', 'Recaudo fallido');
                return { result: true, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
            }
        } catch (error) {
            setUser({ ...user, numerador_rc_manual: +user.numerador_rc_manual++ })
            modifyUser(user);
            console.error('error en recaudo', error);
            if (!isSync) {
                const recaudo = {
                    id: recaudosOffline.length,
                    lat,
                    lon,
                    cc,
                    valor,
                    fecha,
                    observacion,
                    fdp
                }
                const recsOff = [];
                recsOff.push(recaudo);
                const joint = recaudosOffline.concat(recsOff);
                setRecaudosOffline(joint);
                modifyRecaudosOffline(joint);
                if (!silent) {
                    Alert.alert('Recaudo offline exitoso');
                }
                return { result: true, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
            }
            return { result: false, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
        }
    };

    const recaudo = async (silent = false, lat, lon, cc, valor, fecha, observacion, fdp, isSync = false) => {
        try {
            console.log(`https://ws.crmolivosvillavicencio.com/app/getRecaudos.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&valorrecaudo=${valor}&id=${user.id}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&detallerecaudo=${observacion}&forma_de_pago=${fdp}&nueva=${1}`)
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getRecaudos.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&valorrecaudo=${valor}&id=${user.id}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&detallerecaudo=${observacion}&forma_de_pago=${fdp}&nueva=${1}`);
            let json = await response.json();
            if (json.estado === 'successful') {
                if (!isSync) Alert.alert('Éxito', 'Recaudo exitoso');
                return { result: true, rc: json.NumeroRecibo };
            } else {
                if (!isSync) Alert.alert('Error', 'Recaudo fallido');
                return { result: true, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
            }
        } catch (error) {
            setUser({ ...user, numerador_rc_manual: +user.numerador_rc_manual++ })
            modifyUser(user);
            console.error('error en recaudo', error);
            if (!isSync) {
                const recaudo = {
                    id: recaudosOffline.length,
                    lat,
                    lon,
                    cc,
                    valor,
                    fecha,
                    observacion,
                    fdp
                }
                const recsOff = [];
                recsOff.push(recaudo);
                const joint = recaudosOffline.concat(recsOff);
                setRecaudosOffline(joint);
                modifyRecaudosOffline(joint);
                if (!silent) {
                    Alert.alert('Recaudo offline exitoso');
                }
                return { result: true, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
            }
            return { result: false, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
        }
    };

    const gestion = async (silent = false, lat, lon, cc, tipoGestion, fecha, acuerdo, fechaAcuerdo, valorAcuerdo, descripcion, resultadoGestion, isSync = false) => {
        try {
            console.log(`https://ws.crmolivosvillavicencio.com/app/getGestionCartera.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&tipo_gestion=${tipoGestion}&fecha=${fecha}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&acuerdo_pago=${acuerdo}&fecha_acuerdo=${fechaAcuerdo}&valor_acuerdo=${valorAcuerdo}&descripcion=${descripcion}&resultado_gestion=${resultadoGestion}&user_id=${user.id}&nueva=${1}`);
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getGestionCartera.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&tipo_gestion=${tipoGestion}&fecha=${fecha}&rc=${user.iniciales_numerador}&fecha_hora=${fecha}&acuerdo_pago=${acuerdo}&fecha_acuerdo=${fechaAcuerdo}&valor_acuerdo=${valorAcuerdo}&descripcion=${descripcion}&resultado_gestion=${resultadoGestion}&user_id=${user.id}&nueva=${1}`);
            let json = await response.json();
            if (json.estado === 'successful') {
                if (!isSync) Alert.alert('Éxito', 'Gestión exitosa');
                return { result: true, rc: json.NumeroGestion };
            } else {
                if (!isSync) Alert.alert('Error', 'Gestión fallida');
                return { result: true, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
            }
        } catch (error) {
            setUser({ ...user, numerador_rc_manual: +user.numerador_rc_manual++ })
            modifyUser(user);
            console.error('error en gestion', error);
            if (!isSync) {
                const gestion = {
                    id: gestionesOffline.length,
                    lat,
                    lon,
                    cc,
                    tipoGestion,
                    fecha,
                    acuerdo,
                    fechaAcuerdo,
                    valorAcuerdo,
                    descripcion,
                    resultadoGestion
                }
                const gestsOff = [];
                gestsOff.push(gestion);
                const joint = gestionesOffline.concat(gestsOff);
                setGestionesOffline(joint);
                modifyGestionesOffline(joint);
                if (!silent) {
                    Alert.alert('Gestion offline exitosa');
                }
                return { result: true, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
            }
            return { result: false, rc: `${user.iniciales_numerador} ${user.numerador_rc_manual} (manual)` };
        }
    };

    const edicion = async (silent = false, lat, lon, cc, fecha, tel1viejo, tel1nuevo, tel2viejo, tel2nuevo, direccionVieja, direccionNueva, barrioViejo, barrioNuevo, indicacionVieja, indicacionNueva, diaCobroViejo, diaCobroNuevo, isSync = false) => {
        try {
            console.log(`https://ws.crmolivosvillavicencio.com/app/getUpdateInfo.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&fecha=${fecha}&user_id=${user.id}&celular1_o=${tel1viejo}&celular1_n=${tel1nuevo}&celular2_o=${tel2viejo}&celular2_n=${tel2nuevo}&direccion_o=${direccionVieja}&direccion_n=${direccionNueva}&barrio_o=${barrioViejo}&barrio_n=${barrioNuevo}&indicaciones_o=${indicacionVieja}&indicaciones_n=${indicacionNueva}&dia_cobro_o=${diaCobroViejo}&dia_cobro_n=${diaCobroNuevo}&nueva=${1}`);
            let response = await fetch(`https://ws.crmolivosvillavicencio.com/app/getUpdateInfo.php?user_name=${user.user_name}&latitud=${lat}&longitud=${lon}&numerodocumento=${cc}&fecha=${fecha}&user_id=${user.id}&celular1_o=${tel1viejo}&celular1_n=${tel1nuevo}&celular2_o=${tel2viejo}&celular2_n=${tel2nuevo}&direccion_o=${direccionVieja}&direccion_n=${direccionNueva}&barrio_o=${barrioViejo}&barrio_n=${barrioNuevo}&indicaciones_o=${indicacionVieja}&indicaciones_n=${indicacionNueva}&dia_cobro_o=${diaCobroViejo}&dia_cobro_n=${diaCobroNuevo}&nueva=${1}`);
            let json = await response.json();
            //console.log(json);
            if (json.estado === 'successful') {
                if (!isSync) Alert.alert('Éxito', 'Edición de datos exitosa');
                return true;
            } else {
                if (!isSync) Alert.alert('Error', 'Edición de datos fallida');
                return false
            }
        } catch (error) {
            console.error('error en edición', error);
            if (!isSync) {
                const edicion = {
                    id: edicionesOffline.length,
                    lat,
                    lon,
                    cc,
                    fecha,
                    tel1viejo,
                    tel1nuevo,
                    tel2viejo,
                    tel2nuevo,
                    direccionVieja,
                    direccionNueva,
                    barrioViejo,
                    barrioNuevo,
                    indicacionVieja,
                    indicacionNueva,
                    diaCobroViejo,
                    diaCobroNuevo
                }
                const edicionOff = [];
                edicionOff.push(edicion);
                const joint = edicionesOffline.concat(edicionOff);
                setEdicionesOffline(joint);
                modifyEdicionesOffline(joint);
                if (!silent) {
                    Alert.alert('Edición offline exitosa');
                }
                return true;
            }
            return false;
        }
    };

    //SYNC

    const sync = async (silent = false) => {
        let isRecs = true;
        let isGes = true;
        let isEdi = true;

        const promisesRecaudo = recaudosOffline.map(r => syncRecaudo(r));
        const promisesGestion = gestionesOffline.map(g => syncGestion(g));
        const promisesEdicion = edicionesOffline.map(e => syncEdicion(e));

        await Promise.all(promisesRecaudo);
        await cleanRecs();

        await Promise.all(promisesGestion);
        await cleanGes();

        await Promise.all(promisesEdicion);
        await cleanEdi();

        if (!isRecs && !isGes && !isEdi && !silent) {
            Alert.alert('No hay acciones para sincronizar');
            return true;
        };

        if ((recaudosOffline.length === 0) && (gestionesOffline.length === 0) && (edicionesOffline.length === 0)) {
            //if (!silent) Alert.alert('Sincronización completa');
            return true;
        } else {
            //if (!silent) Alert.alert('No se pudo completar la sincronización', `Recaudos: ${recaudosOffline.length}\nGestiones: ${gestionesOffline.length}\nEdiciones: ${edicionesOffline.length}`);
            return false;
        }
    };

    const syncRecaudo = async rec => {
        await recaudoOffline(true, rec.lat, rec.lon, rec.cc, rec.valor, rec.fecha, rec.observacion, rec.fdp, true).then(async ({ result }) => {
            if (!!result) {
                const aux = syncedRecIds;
                aux.push(rec.id);
                setSyncedRecIds(aux);
            }
        });
    };

    const syncGestion = async ges => {
        await gestion(true, ges.lat, ges.lon, ges.cc, ges.tipoGestion, ges.fecha, ges.acuerdo, ges.fechaAcuerdo, ges.valorAcuerdo, ges.descripcion, ges.resultadoGestion, true).then(async ({ result }) => {
            if (!!result) {
                const aux = syncedGesIds;
                aux.push(ges.id);
                setSyncedGesIds(aux);
            }
        });
    };

    const syncEdicion = async edi => {
        await edicion(true, edi.lat, edi.lon, edi.cc, edi.fecha, edi.tel1viejo, edi.tel1nuevo, edi.tel2viejo, edi.tel2nuevo, edi.direccionVieja, edi.direccionNueva, edi.barrioViejo, edi.barrioNuevo, edi.indicacionVieja, edi.indicacionNueva, edi.diaCobroViejo, edi.diaCobroNuevo, true).then(async result => {
            if (!!result) {
                const aux = syncedEdiIds;
                aux.push(edi.id);
                setSyncedEdiIds(aux);
            }
        });
    };

    const cleanRecs = async () => {
        const filtered = recaudosOffline.filter(rec => !syncedRecIds.includes(rec.id));
        await modifyRecaudosOffline(filtered);
        setSyncedRecIds([]);
    };

    const cleanGes = async () => {
        const filtered = gestionesOffline.filter(ges => !syncedGesIds.includes(ges.id));
        await modifyGestionesOffline(filtered);
        setSyncedGesIds([]);
    };

    const cleanEdi = async () => {
        const filtered = edicionesOffline.filter(edi => !syncedEdiIds.includes(edi.id));
        await modifyEdicionesOffline(filtered);
        setSyncedEdiIds([]);
    };

    //BLUETOOTH

    const [listeners, setListeners] = useState([]);
    const [devices, setDevices] = useState(null);
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [bleOpened, setBleOpened] = useState(false);
    const [btLoading, setBtLoading] = useState(false);
    const [name, setName] = useState('');
    const [boundAddress, setBoundAddress] = useState('');

    const deviceAlreadPaired = (rsp) => {
        var ds = null;
        if (typeof (rsp.devices) == 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) {
            }
        }
        if (ds && ds.length) {
            let pared = pairedDs;
            pared = pared.concat(ds || []);
            setPairedDs(pared);
        }
    };

    const deviceFoundEvent = (rsp) => {//alert(JSON.stringify(rsp))
        var r = null;
        try {
            if (typeof (rsp.device) == "object") {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {//alert(e.message);
            //ignore
        }
        //alert('f')
        if (r) {
            let found = foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    found.push(r);
                    setFoundDs(found);
                }
            }
        }
    };

    const getParametrosRecaudo = async () => {
        try {
            console.log('https://ws.crmolivosvillavicencio.com/app/getParametrosRecibo.php');
            let response = await fetch('https://ws.crmolivosvillavicencio.com/app/getParametrosRecibo.php');
            let data = await response.json();
            modifyParametrosRecaudo(data);
        } catch (error) {
            console.error('error en getDatosRecaudo', error);
        }
    };

    const getParametrosGestion = async () => {
        try {
            console.log('https://ws.crmolivosvillavicencio.com/app/getParametrosGestion.php');
            let response = await fetch('https://ws.crmolivosvillavicencio.com/app/getParametrosGestion.php');
            let data = await response.json();
            modifyParametrosGestion(data);
        } catch (error) {
            console.error('error en getDatosGestion', error);
        }
    };

    return (
        <Context.Provider value={{
            listeners, setListeners,
            devices, setDevices,
            pairedDs, setPairedDs,
            foundDs, setFoundDs,
            bleOpened, setBleOpened,
            btLoading, setBtLoading,
            name, setName,
            boundAddress, setBoundAddress,
            deviceAlreadPaired, deviceFoundEvent,

            setUp,
            downloadCartera,
            getHistory,
            getParametrosGestion,
            getParametrosRecaudo,
            login,
            modifyCartera,
            modifyLogged,
            modifyUser,
            recaudo,
            gestion,
            edicion,
            getGestionesOffline,
            modifyGestionesOffline,
            getRecaudosOffline,
            modifyRecaudosOffline,
            getEdicionesOffline,
            modifyEdicionesOffline,
            sync,
            findCC,
            cartera,
            logged,
            user,
            find,
            gestionesOffline,
            recaudosOffline,
            edicionesOffline,
            history,
            parametrosRecaudo,
            parametrosGestion
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;