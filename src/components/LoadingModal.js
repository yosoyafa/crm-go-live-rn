import React from 'react';
import { Modal, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingModal = ({ visible, message }) => {
    return (
        <Modal transparent visible={visible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
                    <ActivityIndicator size="large" color="#96158C" />
                    {!!message && <Text atyle={{ margin: 10 }}>{message}</Text>}
                </View>
            </View>
        </Modal>
    );
}

export default LoadingModal;