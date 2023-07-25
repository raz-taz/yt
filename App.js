import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { getFiles } from './filesystem';
// import { Log } from './log';

import HomeScreen from './HomeScreen';
import AddScreen from './AddScreen';
import SearchScreen from './SearchScreen';
import { PlayingSpace, SongMenu } from './Components';
import { PlayingProvider } from './Provider';





const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <PlayingProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name='Search' component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <SongMenu/>
      <PlayingSpace/>
    </PlayingProvider>
  );
}


