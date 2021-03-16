import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, Modal } from 'react-native';
import SearchBar from '../components/SearchBar';
import { ActivityIndicator, Button } from 'react-native-paper';

import Context from '../context/Context';
import ContratoCard from '../components/ContratoCard';
import MenuBar from '../components/MenuBar';

const HomeScreen = ({ navigation }) => {

    const { downloadCartera, cartera, user, sync, findCC, find } = useContext(Context);

    const [lista, setLista] = useState(cartera.contratos);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = cartera.contratos.filter(contrato => String(contrato.numero_documento).startsWith(formattedQuery));
        setLista(filteredData);
        setQuery(text);
    };

    useEffect(() => {
        if (cartera) {
            setLista(cartera.contratos);
        }
    }, [cartera]);

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
            onPress: async () => {
                setLoadingModal(true);
                await sync(false);
                setLoadingModal(false);
            }
        }
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <MenuBar
                    menuOnPress={() => navigation.openDrawer()}
                    buttons={menuBarItems}
                />
                <SearchBar
                    term={query}
                    placeholder='Cédula'
                    onChangedText={setQuery}
                    onChangeText={queryText => handleSearch(queryText)}
                    keyboardType={'numeric'}
                    style={{ marginHorizontal: 20, marginTop: 10 }}
                />

                {!!lista && !loading ?
                    <>
                        {lista.length !== 0 ?
                            <FlatList
                                data={lista}
                                style={{ paddingHorizontal: 20, paddingTop: 10 }}
                                keyExtractor={(item) => item.numeropoliza}
                                ListHeaderComponent={<View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 21 }}>Cartera</Text>
                                    <Text>{cartera.fecha}</Text>
                                </View>}
                                renderItem={({ item, index, }) => {
                                    let isLast;
                                    lista.length === index + 1 ? isLast = true : isLast = false;
                                    return <ContratoCard
                                        item={item}
                                        last={isLast}
                                        gestion={() => navigation.navigate('Gestion', { contrato: item })}
                                        recaudo={() => navigation.navigate('Recaudo', { contrato: item })}
                                        edicion={() => navigation.navigate('Edicion', { contrato: item })}
                                    />
                                }}
                            />
                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, paddingTop: 10 }}>
                                <Text style={{ fontSize: 18, color: 'gray', textAlign: 'center', marginBottom: 12 }} >No se han encontrado resultados para la cédula: {query}</Text>
                                <Button
                                    theme={{
                                        colors: {
                                            primary: '#96158C',
                                        }
                                    }}
                                    icon='cloud-search'
                                    mode='contained'
                                    onPress={() => {
                                        findCC(query, user.id)
                                            .then(!!find.length && setLista(find));
                                    }}
                                >Buscar en servidor</Button>
                            </View>
                        }
                    </>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color='purple' size='large' />
                    </View>
                }
            </View>
            <Modal transparent visible={loadingModal}>
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
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: 20
    },
});

export default HomeScreen;