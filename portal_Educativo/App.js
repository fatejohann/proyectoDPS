import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Screens/Login';
import Registro from './src/Screens/Registro'; // Importa la pantalla de Registro

import { useState, useEffect } from 'react';

//TIPOGRAFIA
import * as Font from 'expo-font'


import Home from './src/Screens/Profesor/Home';
import AlumnosHome from './src/Screens/alumnos/Alumnoshome';
import Calificacion from './src/Screens/Profesor/Calificaciones';
import IngresarCalificacion from './src/Screens/Profesor/IngresarCalificaciones';
import Horario from './src/Screens/Profesor/Horario';
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
        <Stack.Screen name="Registro" component={Registro}  options={{ headerShown: false }}/> 

      {/* Vistas de la parte del alumno */}
        <Stack.Screen name="AlumnoHome" component={AlumnosHome} options={{ headerShown: false }}/>


      {/* Vistas de la parte del profesor */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Horario" component={Horario} options={{ headerShown: false }}/>
        <Stack.Screen name="Calificaciones" component={Calificacion} options={{ headerShown: false }}/>
        <Stack.Screen name="IngresarCalificaciones" component={IngresarCalificacion} options={{ headerShown: false }}/>
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
