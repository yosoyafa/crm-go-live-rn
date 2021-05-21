import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import codePush from 'react-native-code-push';

import Context, { Provider } from './src/context/Context';

import { MainDrawer, LoginStack } from './src/navigation';

const Main = () => {
  const { logged, setUp, user } = useContext(Context);

  useEffect(() => {
    setUp();
  }, []);

  return logged === '1' ? <MainDrawer /> : <LoginStack />;
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

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

export default codePush(codePushOptions)(App);
