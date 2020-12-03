import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { IconButton, ActivityIndicator } from 'react-native-paper';

import Context from '../context/Context';
import ContratoCard from '../components/ContratoCard';

const HomeScreen = ({ navigation }) => {

    const { downloadCartera, cartera, user } = useContext(Context);

    const [lista, setLista] = useState(cartera.contratos);
    const [term, setTerm] = useState('');
    const [closeVisible, setCloseVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>
                <SearchBar
                    onChangedTerm={setTerm}
                    onSubmitTerm={() => {
                        if (term === '') {
                            setLista(cartera.contratos);
                        } else {
                            setLista(cartera.contratos);
                            setLista(lista.filter(contrato => contrato.cedula === term));
                            setCloseVisible(true);
                        }
                    }}
                />
                <View style={{ flexDirection: 'row-reverse', marginTop: 10 }}>
                    {closeVisible && <IconButton
                        icon='close-circle'
                        color='#96158C'
                        size={20}
                        onPress={() => {
                            setLista(cartera.contratos);
                            setCloseVisible(false);
                            setTerm('');
                        }}
                    />}
                </View>

                {!!lista && !loading ?
                    <>
                        {lista.length !== 0 ?
                            <>
                                <Text style={{ textAlign: 'right' }}>{cartera.fecha}</Text>
                                <FlatList
                                    data={lista}
                                    keyExtractor={(item) => item.numeropoliza}
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
                            </>
                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'gray' }} >No se han encontrado resultados para la búsqueda</Text>
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