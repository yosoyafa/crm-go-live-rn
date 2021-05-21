import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid, DeviceEventEmitter, Modal, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Title, Caption, Drawer, Switch, ActivityIndicator, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';

import Context from '../context/Context';

const DrawerContent = (props) => {

    const {
        modifyLogged,
        modifyUser,
        modifyCartera,
        modifyGestionesOffline,
        modifyRecaudosOffline,
        modifyEdicionesOffline,
        user,
        logged,
        sync,
        setBleOpened,
        bleOpened,
        setFoundDs,
        foundDs,
        setPairedDs,
        pairedDs,
        setName,
        setBoundAddress,
        setListeners,
        deviceFoundEvent,
        deviceAlreadPaired,
        name,
    } = useContext(Context);

    const windowWidth = useWindowDimensions().width;

    const [scanning, setScanning] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pairedVisible, setPairedVisible] = useState(false);
    const [connectingAddress, setConnectingAddress] = useState('');

    useEffect(() => {
        BluetoothManager.isBluetoothEnabled().then((enabled) => {
            setBleOpened(Boolean(enabled));
        }, (err) => {
            console.error(err);
        });

        const aux = [];
        aux.push(DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                deviceAlreadPaired(rsp)
            }));
        aux.push(DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                deviceFoundEvent(rsp)
            }));
        aux.push(DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_CONNECTION_LOST, () => {
                setName('');
                setBoundAddress('');
            }
        ));
        aux.push(DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                ToastAndroid.show("Device Not Support Bluetooth!", ToastAndroid.LONG);
            }
        ));
        setListeners(aux);
    }, []);

    const switchHandler = v => {
        if (!v) {
            BluetoothManager.disableBluetooth().then(() => {
                setBleOpened(false);
                setFoundDs([]);
                setPairedDs([]);
            }, (err) => { alert(err) });

        } else {
            BluetoothManager.enableBluetooth().then((r) => {
                var paired = [];
                if (r && r.length > 0) {
                    for (var i = 0; i < r.length; i++) {
                        try {
                            paired.push(JSON.parse(r[i]));
                        } catch (e) {
                            //ignore
                        }
                    }
                }
                setBleOpened(true);
                setPairedDs(paired);
                console.log(paired);
            }, (err) => {
                setBtLoading(false);
                alert(err)
            });
        }
    };

    const scan = () => {
        setScanning(true);
        BluetoothManager.scanDevices()
            .then((s) => {
                var ss = s;
                var found = ss.found;
                try {
                    found = JSON.parse(found);//@FIX_it: the parse action too weired..
                } catch (e) {
                    //ignore
                }
                var fds = foundDs;
                if (found && found.length) {
                    fds = found;
                }
                setFoundDs(fds);
                setScanning(false);
                setVisible(true);
            }, (er) => {
                setScanning(false);
                alert('error' + JSON.stringify(er));
            });
    };

    return <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props} >
            <View style={styles.drawerContent}>
                {logged === '1' ?
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginStart: 15 }}>
                                <Title style={styles.title}>{`${user.first_name} ${user.last_name}`}</Title>
                                <Caption style={styles.caption}>{user.user_name}</Caption>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
                <Drawer.Section style={styles.drawerSection}>
                    <View style={{ marginLeft: 15 }}>
                        <DrawerItemList {...props} />
                    </View>
                </Drawer.Section>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 16, marginBottom: 24, justifyContent: 'space-between' }}>
                    <Text>Bluetooth</Text>
                    <Switch
                        value={bleOpened}
                        color={'#96158C'}
                        onValueChange={v => switchHandler(v)}
                    />
                </View>
                {bleOpened && <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ borderRadius: 90, height: 10, width: 10, backgroundColor: !!name ? 'green' : 'red' }}></View>
                            <Text style={{ marginLeft: 8 }}>{!!name ? name : 'Desconectado'}</Text>
                        </View>
                        {/*!scanning ?
                            <Text
                                style={{ color: '#96158C', fontWeight: 'bold' }}
                                onPress={() => scan()}
                            >ESCANEAR</Text>
                            :
                            <ActivityIndicator size={18} color={'#96158C'} />
                        */}
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setPairedVisible(!pairedVisible)}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Dispositivos emparejados</Text>
                        <Icon name={pairedVisible ? 'chevron-up' : 'chevron-down'} color='#96158C' size={30} />
                    </TouchableOpacity>
                    {pairedVisible && <FlatList
                        data={pairedDs}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'black' }}></View>}
                        renderItem={({ item }) => <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => {
                            setConnectingAddress(item.address);
                            BluetoothManager.connect(item.address)
                                .then((s) => {
                                    setBoundAddress(item.address);
                                    setName(item.name || 'UNKNOWN');
                                    setConnectingAddress('');
                                    setPairedVisible(false);
                                }, (e) => {
                                    setConnectingAddress('');
                                    alert(e);
                                });
                        }}>
                            <Text style={{ marginVertical: 16, marginLeft: 16 }}>{item.name}</Text>
                            {connectingAddress === item.address && <ActivityIndicator size={18} color={'#96158C'} />}
                        </TouchableOpacity>}
                    />}
                </View>}
            </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <Drawer.Item
                icon={({ color, size }) => <Icon name='logout' color={color} size={size} />}
                label={'Cerrar sesión'}
                onPress={() => {
                    if (sync(true)) {
                        modifyLogged('0');
                        modifyUser({});
                        modifyCartera([]);
                        modifyGestionesOffline([]);
                        modifyEdicionesOffline([]);
                        modifyRecaudosOffline([]);
                    }
                }}
            />
        </Drawer.Section>
        <Modal transparent visible={visible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa', paddingVertical: 24, paddingHorizontal: 20 }}>
                <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 24, borderRadius: 8 }}>
                    <IconButton icon='close' color={'#96158C'} size={20} onPress={() => setVisible(false)} style={{ alignSelf: 'flex-end' }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 21, marginBottom: 10 }}>Dispositivos encontrados</Text>
                    <FlatList
                        data={foundDs}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ width: windowWidth - 40, height: 1, backgroundColor: 'black' }}></View>}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: windowWidth - 40, marginVertical: 20, padding: 10, elevation: 2, backgroundColor: 'white' }} key={new Date().getTime() + index} onPress={() => {
                                    setConnectingAddress(item.address);
                                    BluetoothManager.connect(item.address)
                                        .then((s) => {
                                            setBoundAddress(item.address);
                                            setName(item.name || 'UNKNOWN');
                                            setConnectingAddress('');
                                            setVisible(false);
                                        }, (e) => {
                                            setConnectingAddress('');
                                            alert(e);
                                        })
                                }}>
                                    <Text>{item.name || "UNKNOWN"}</Text>
                                    {connectingAddress === item.address && <ActivityIndicator size={18} color={'#96158C'} />}
                                </TouchableOpacity>
                            );
                        }}
                        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No se encontraron dispositivos</Text>}
                    />
                </View>
            </View>
        </Modal>
    </View>
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    image: {
        margin: 5,
        alignSelf: 'center',
        width: '70%',
        height: '20%'
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingTop: 15
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default DrawerContent;