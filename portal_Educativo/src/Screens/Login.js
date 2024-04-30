import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/credenciales'; // Asegúrate de importar db también
import { getDocs, collection, query, where } from 'firebase/firestore';

import colores from '../utils/colores';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const handleLogin = async () => {
    try {
      // Iniciar sesión con el correo electrónico y la contraseña
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener el ID de usuario
      const uid = user.uid;
  
      // Consultar la colección de usuarios en Firestore para obtener el rol del usuario
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        // Obtener los datos del usuario encontrado
        const usuario = doc.data();
        
        // Verificar si el usuario es estudiante o maestro
        if (usuario.rol === 'Estudiante') {
          // Usuario válido como estudiante
          navigation.navigate('AlumnoHome');
        } else if (usuario.rol === 'Maestro') {
          // Usuario válido como maestro
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PORTAL EDUCATIVO</Text>
        <Text style={styles.text}>BIENVENIDO</Text>
        <Image source={require('../utils/img/login.png')} />
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Ingresa tus datos</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder='Ingresa tu email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            placeholder='Ingresa tu Contraseña'
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.boxBtn}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.buttonText}>REGISTRARSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.COLOR_CELESTE,
    textAlign:'center'
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 25,
    margin: 10,
    alignItems: 'center',
    fontFamily: 'JockeyOne',
  },
  text: {
    color: 'white',
    fontSize: 45,
    margin: 10,
    fontFamily: 'JockeyOne',
    textAlign:'center'
  },
  content: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'start',
  },
  contentText: {
    fontSize: 25,
    marginRight: 100,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: 50,
    alignItems: 'end',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    fontSize: 20,
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    borderColor: 'white',
    backgroundColor: colores.COLOR_BLANCO,
  },
  boxBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: 200,
    padding: 15,
    margin: 15,
    borderRadius: 20,
    backgroundColor: colores.COLOR_MORADO,
  },
  registerButton: {
    width: 200,
    padding: 15,
    margin: 15,
    borderRadius: 20,
    backgroundColor: colores.COLOR_ANARANJADO,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
  },
});
