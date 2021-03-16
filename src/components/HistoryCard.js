import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryCard = ({ recibo, type }) => {
    return (
        <View style={styles.card} >
            <View style={{ flex: 1, margin: 10 }} onPress={() => console.log(1)}>
                <View style={{ flex: 1, margin: 5 }}>
                    {type === 'recaudo' ?
                        <>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#96158C', marginBottom: 5 }}>{recibo.numerorecibo}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>{recibo.name}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>CC: {recibo.numerodocumento}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>${recibo.valorrecaudado}</Text>
                            <Text numberOfLines={1} style={{ fontSize: 14, color: '#000', marginBottom: 5 }}>{recibo.detalledelpago}</Text>
                        </>
                        :
                        <>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#96158C', marginBottom: 5 }}>{recibo.name}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>{recibo.nombre_cliente}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>CC: {recibo.numero_documento}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>Resultado gestion: {recibo.resultadogestion}</Text>
                            {recibo.acuerdodepago === '1' && <>
                                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>Valor a pagar: ${recibo.valor_acuerdo}</Text>
                                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 5 }}>Fecha de pago: {recibo.fecha_acuerdo}</Text>
                            </>}
                            <Text numberOfLines={1} style={{ fontSize: 14, color: '#000', marginBottom: 5 }}>{recibo.description}</Text>
                        </>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        zIndex: 999,
        backgroundColor: 'white',
        borderRadius: 7,
        marginTop: 15,
        marginBottom: 10,
        elevation: 2,
        //marginHorizontal: 20,
    },
    options: {
        flexDirection: 'row-reverse',
        backgroundColor: 'purple',
        borderRadius: 7,
        paddingTop: 10,
        marginTop: -20,
        elevation: 2,
        //marginHorizontal: 20,
    }
});

export default HistoryCard;