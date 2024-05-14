import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Screens/Login';
import Registro from './src/Screens/Registro';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import Home from './src/Screens/Profesor/Home';
import AlumnosHome from './src/Screens/alumnos/Alumnoshome';
import HorarioAlumno from './src/Screens/alumnos/HorarioAlumno';
import AlumnoActividades from './src/Screens/alumnos/AlumnoActividades';
import Calificacion from './src/Screens/Profesor/Calificaciones';
import Horario from './src/Screens/Profesor/Horario';
import IngresarCalificaciones from './src/Screens/Profesor/ingresarCalificaciones';
import AlumnoCalificaciones from './src/Screens/alumnos/AlumnoCalificaciones';
import Actividades from './src/Screens/Profesor/Actividades';
import IngresarActividades from './src/Screens/Profesor/IngresarActividades';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      'JockeyOne': require('./src/utils/fonts/JockeyOne-Regular.ttf')
    });
    setFontsLoaded(true);
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'> 
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/> 

        {/* Vistas de la parte del alumno */}
        <Stack.Screen name="AlumnoHome" component={AlumnosHome} options={{ headerShown: false }}/>
        <Stack.Screen name="HorarioAlumno" component={HorarioAlumno} options={{ headerShown: false }}/>
        <Stack.Screen name="AlumnoCalificaciones" component={AlumnoCalificaciones} options={{ headerShown: false }}/>
        <Stack.Screen name="AlumnoActividades" component={AlumnoActividades} options={{ headerShown: false }}/>
      
        {/* Vistas de la parte del profesor */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Horario" component={Horario} options={{ headerShown: false }}/>
        <Stack.Screen name="Calificaciones" component={Calificacion} options={{ headerShown: false }}/>
        <Stack.Screen name="IngresarCalificaciones" component={IngresarCalificaciones} options={{ headerShown: false }}/>
        <Stack.Screen name="Actividades" component={Actividades} options={{ headerShown: false }}/>
        <Stack.Screen name="IngresarActividades" component={IngresarActividades} options={{ headerShown: false }}/>
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
