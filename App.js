import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddNote from './components/AddNote.js';
import HomeScreen from './components/HomeScreen.js';
import EditNote from './components/EditNote.js'
import SearchNote from './components/SearchNote.js'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Deine Notizen'>
        <Stack.Screen name="Deine Notizen" component={HomeScreen} options={{ title: 'Deine Notizen', headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Notiz erstellen" component={AddNote} options={{ title: 'Notiz erstellen', headerShown: false, gestureEnabled: false, animation:'none' }}/>
        <Stack.Screen name="Suche" component={SearchNote} options={{ title: 'Suche', headerShown: false }}/>
        <Stack.Screen name="Notiz editieren" component={EditNote} options={{ title: 'Notiz editieren', headerShown: false, gestureEnabled: false, animation: 'none' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;