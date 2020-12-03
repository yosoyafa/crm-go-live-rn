import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Context, { Provider } from './src/context/Context';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import GestionScreen from './src/screens/GestionScreen';
import RecaudoScreen from './src/screens/RecaudoScreen';
import EdicionScreen from './src/screens/EdicionScreen';
import HistoryScreen from './src/screens/HistoryScreen';

import DrawerContent from './src/components/DrawerContent';

const Tab = createBottomTabNavigator();
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
}

const Login = () => {
  return <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
}

const MDrawer = () => {
  const { user, cartera, downloadCartera } = useContext(Context);

  useEffect(() => {
    if (Object.keys(cartera).length == 0) downloadCartera(user.id);
  }, [user]);

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} drawerContentOptions={{ activeTintColor: 'purple', }}>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );

}

const Main = () => {
  const { logged, setUp, user } = useContext(Context);

  useEffect(() => {
    setUp();
  }, [user]);

  return logged === '1' ? <MDrawer /> : <Login />;
}

const App = () => {

  return (
    <Provider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
