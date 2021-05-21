import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import codePush from 'react-native-code-push';
import * as Sentry from "@sentry/react-native";

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
  Sentry.init({
    dsn: "https://486bef2bb735421d8e159d6fc4a6f86b@o654474.ingest.sentry.io/5762178",
  });
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
