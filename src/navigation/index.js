import React, { useContext, useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Context from '../context/Context';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import GestionScreen from '../screens/GestionScreen';
import RecaudoScreen from '../screens/RecaudoScreen';
import EdicionScreen from '../screens/EdicionScreen';
import HistoryScreen from '../screens/HistoryScreen';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Recaudo"
            component={RecaudoScreen}
        />
        <Stack.Screen
            name="Gestion"
            component={GestionScreen}
        />
        <Stack.Screen
            name="Edicion"
            component={EdicionScreen}
        />
    </Stack.Navigator>
};

export const LoginStack = () => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
};

export const MainDrawer = () => {
    const { user, cartera, history, downloadCartera, getHistory, getParametrosGestion, getParametrosRecaudo, parametrosRecaudo, parametrosGestion } = useContext(Context);

    useEffect(() => {
        const start = async () => {
            if (!Object.keys(cartera).length) await downloadCartera(user.id);
            if (!Object.keys(history).length) await getHistory(user.id);
            if (!Object.keys(parametrosRecaudo).length) await getParametrosRecaudo();
            if (!Object.keys(parametrosGestion).length) await getParametrosGestion();
        };
        start();
    }, [user]);

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => <DrawerContent {...props} />}
            drawerContentOptions={{ activeTintColor: 'purple' }}
        >
            <Drawer.Screen
                name='Cartera'
                component={HomeStack}
            />
            <Drawer.Screen
                name='Historial'
                component={HistoryScreen}
            />
        </Drawer.Navigator>
    );

};