import React, { useEffect, useState } from 'react';
import { View, Text, Switch, FlatList, DeviceEventEmitter, Button, TouchableOpacity } from 'react-native';
import { } from 'react-native-paper';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import LoadingModal from '../components/LoadingModal';

const BluetoothScreen = () => {

    const [listeners, setListeners] = useState([]);
    const [devices, setDevices] = useState(null);
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [bleOpened, setBleOpened] = useState(false);
    const [btLoading, setBtLoading] = useState(false);
    const [name, setName] = useState('');
    const [boundAddress, setBoundAddress] = useState('');

    useEffect(() => {
        setBtLoading(true);
        BluetoothManager.isBluetoothEnabled().then((enabled) => {
            setBleOpened(Boolean(enabled));
            setBtLoading(false);
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
        setBtLoading(false);

    }, []);

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
    const scan = () => {
        setBtLoading(true);
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
                setBtLoading(false);
            }, (er) => {
                setBtLoading(false);
                alert('error' + JSON.stringify(er));
            });
    };
    const switchHandler = v => {
        setBtLoading(true);
        if (!v) {
            BluetoothManager.disableBluetooth().then(() => {
                setBleOpened(false);
                setBtLoading(false);
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
                setBtLoading(false);
            }, (err) => {
                setBtLoading(false);
                alert(err)
            });
        }

    };
    return (
        <>
            <View style={{ flex: 1, margin: 20 }}>
                <Switch value={bleOpened} onValueChange={(v) => switchHandler(v)} />
                <Text>Conected: {name ? name : 'no device'}</Text>
                <Button onPress={scan} title='scan'>scan</Button>
                <FlatList
                    data={pairedDs.concat(foundDs)}
                    keyExtractor={(ite, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ marginVertical: 20, padding: 10, elevation: 2, backgroundColor: 'white' }} key={new Date().getTime() + index} onPress={() => {
                                setBtLoading(true);
                                BluetoothManager.connect(item.address)
                                    .then((s) => {
                                        setBtLoading(false);
                                        setBoundAddress(item.address);
                                        setName(item.name || 'UNKNOWN');
                                    }, (e) => {
                                        setBtLoading(false);
                                        alert(e);
                                    })

                            }}>
                                <Text>{item.name || "UNKNOWN"}</Text>
                                <Text>{item.address}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                <Button onPress={async () => {
                    await BluetoothEscposPrinter.printerInit();
                    await BluetoothEscposPrinter.printText("asdfghjkl", {});
                }} title="Print Text" />
            </View>
            <LoadingModal visible={btLoading} message={'loading bt'} />
        </>
    );
}

export default BluetoothScreen;