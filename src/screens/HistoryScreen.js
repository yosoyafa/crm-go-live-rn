import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import HistoryCard from '../components/HistoryCard';
import MenuBar from '../components/MenuBar';
import Context from '../context/Context';
import Tabs from '../components/Tabs';

const HistoryScreen = ({ navigation }) => {

    const { history, getHistory, user } = useContext(Context);

    const [lista, setLista] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [active, setActive] = useState(0);


    useEffect(() => {
        switch (active) {
            case 0:
                setLista(history?.recaudos || []);
                break;
            case 1:
                setLista(history?.gestiones || []);
                break;
        }
    }, [active]);

    useEffect(() => {
        getHistory(user.id);
    }, []);

    const refresh = async () => {
        setRefreshing(true);
        await getHistory(user.id).then(() => {
            setRefreshing(false);
        });
    };

    const menuBarItems = [
        {
            name: 'cloud-download',
            onPress: async () => {
                setLoading(true);
                downloadCartera(user.id).then(
                    () => {
                        setLista(cartera.contratos);
                        setLoading(false);
                    }
                )
            }
        },
        {
            name: 'sync',
            onPress: () => sync(false)
        }
    ];

    return (
        <View style={{ flex: 1 }}>
            <MenuBar
                menuOnPress={() => navigation.openDrawer()}
            //buttons={menuBarItems}
            />
            <View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 21 }}>Historial</Text>
                <Text>{history.fecha}</Text>
            </View>
            <Tabs active={active} setActive={setActive} tabs={[{ title: 'Recaudos' }, { title: 'Gestiones' }]} />
            {!!lista ?
                <FlatList
                    data={lista}
                    onRefresh={refresh}
                    refreshing={refreshing}
                    style={{ paddingHorizontal: 20, paddingTop: 10 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        let isLast;
                        lista.length === index + 1 ? isLast = true : isLast = false;
                        return !isLast ?
                            <HistoryCard
                                type={active === 0 ? 'recaudo' : 'gestion'}
                                recibo={item}
                            />
                            :
                            <View style={{ marginBottom: 10 }}>
                                <HistoryCard
                                    type={active === 0 ? 'recaudo' : 'gestion'}
                                    recibo={item}
                                />
                            </View>
                    }}
                    ListEmptyComponent={<View style={{ flex: 1, alignItems: 'center', marginVertical: 50 }}>
                        <Text>No hay recibos disponibles</Text>
                    </View>}
                />
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color='purple' size='large' />
                </View>}
        </View>
    );
};

export default HistoryScreen;