import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Stopwatch from './component/Stopwatch'; 


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Stopwatch />
    </SafeAreaView>
  );
};

export default App;
