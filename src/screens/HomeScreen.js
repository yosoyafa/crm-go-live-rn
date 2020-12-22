import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { IconButton, ActivityIndicator, Button } from 'react-native-paper';

import Context from '../context/Context';
import ContratoCard from '../components/ContratoCard';

const HomeScreen = ({ navigation }) => {

    const { downloadCartera, cartera, user, sync, findCC, find } = useContext(Context);

    const [lista, setLista] = useState(cartera.contratos);
    const [query, setQuery] = useState('');
    const [closeVisible, setCloseVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton
                        icon="menu"
                        size={30}
                        onPress={() => navigation.openDrawer()}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            icon="cloud-download"
                            size={30}
                            onPress={async () => {
                                setLoading(true);
                                downloadCartera(user.id).then(
                                    () => {
                                        setLista(cartera.contratos);
                                        setLoading(false);
                                    }
                                )
                            }}
                        />
                        <IconButton
                            icon="sync"
                            size={30}
                            onPress={() => sync(false)}
                        />
                    </View>
                </View>
                <SearchBar
                    term={query}
                    onChangedText={setQuery}
                    onChangeText={queryText => handleSearch(queryText)}
                    keyboardType={'numeric'}
                />

                {!!lista && !loading ?
                    <>
                        {lista.length !== 0 ?
                            <FlatList
                                data={lista}
                                keyExtractor={(item) => item.numeropoliza}
                                ListHeaderComponent={<Text style={{ textAlign: 'right', marginTop: 10 }}>{cartera.fecha}</Text>}
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
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'gray', textAlign: 'center', marginBottom: 12 }} >No se han encontrado resultados para la cédula: {query}</Text>
                                <Button
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
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 10,
    },
})

export default HomeScreen;