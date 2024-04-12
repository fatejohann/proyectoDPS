import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from'@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/Screens/Login';
import { useState, useEffect } from 'react';

//TIPOGRAFIA
import * as Font from 'expo-font'
const Stack = createNativeStackNavigator();

export default function App() {

  //Nos servira para exportar nuestra fuente
  const [fontsLoaded, setFontsload] = useState(false);

  useEffect(()=>{
    if(!fontsLoaded){
      loadFonts()
    }
  });
  const loadFonts= async()=>{
    await Font.loadAsync({
      'JockeyOne': require('./src/utils/fonts/JockeyOne-Regular.ttf')
     
    })
    
  setFontsload(true);
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
