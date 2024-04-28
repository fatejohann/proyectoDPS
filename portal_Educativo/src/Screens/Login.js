
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput,Button, TouchableOpacity, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

//Para las tener los colores en variables
import colores from '../utils/colores';

//Exportamos la imagen del login
import ImagenLogin from '../utils/img/login.png'

//Exportamos lo necesario para firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/credenciales';
import { useState } from 'react';
import Home from './Profesor/Home';
 

export default function Login() {

const navigation = useNavigation();

const [email, setEmail]=useState('');
const [password, setPassword]=useState('');

const app= initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleSingIngProfesor=()=>{

    signInWithEmailAndPassword(auth,email,password)
    
    .then((userCredential)=>{
        console.log('registrado');
        const user = userCredential.user;
        console.log(user) 
        navigation.navigate('Home');
    })
    .catch(error =>{
        console.log(error)
        Alert.alert(error)
    })
}


const handleSingIngAlumno=()=>{

    signInWithEmailAndPassword(auth,email,password)
    
    .then((userCredential)=>{
        console.log('registrado');
        const user = userCredential.user;
        console.log(user) 
        navigation.navigate('AlumnoHome');
    })
    .catch(error =>{
        console.log(error)
        Alert.alert(error)
    })
}



    return (
     
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>PORTAL EDUCATIVO</Text>
            <Text style={styles.text}>BIENVENIDO</Text>
            <Image source={ImagenLogin} />
        </View>

        <View style={styles.content}>
            <Text style={styles.contentText}>Ingresa tus datos</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput placeholder='Ingresa tu email' style={styles.input} onChangeText={(text)=>setEmail(text)}/>
                
                <Text style={styles.label}>Contraseña:</Text>
                <TextInput placeholder=' Ingresa tu Contraseña' style={styles.input} onChangeText={(text)=>setPassword(text)} />

                <View style={styles.boxBtn}>
                <TouchableOpacity style={styles.loginButton} onPress={handleSingIngProfesor}>
                    <Text style={styles.buttonText}>INICIAR SESIÓN PARA PROFESOR</Text>
                </TouchableOpacity>
                    
                </View>

                <View style={styles.boxBtn}>
                        <TouchableOpacity style={styles.createBtn} onPress={handleSingIngAlumno}>
                            <Text style={styles.buttonText}>INICIAR SESIÓN PARA ALUMNO</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    </View>
           
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colores.COLOR_CELESTE,
        
    },
    header:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color:'white',
        fontSize:25,
        margin:10,
        fontFamily:'JockeyOne',
    },
    text:{
        color:'white',
        fontSize:45,
        margin:10,
        fontFamily:'JockeyOne',
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex:3,
        backgroundColor: colores.COLOR_BLANCO,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 40, 
        alignItems: 'center',
        justifyContent: 'start', 
    },
    contentText:{
        fontSize: 25,
        marginRight:100,
        fontWeight: 'bold',
    },
    inputContainer:{
        paddingTop:50,
        alignItems: 'end',
        justifyContent:'center',
    },
    label: {
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold',
    },
    input:{
        width:250,
        fontSize: 20,
        borderWidth:3,
        borderRadius:20,
        padding:10,
        margin:10,
        borderColor:'white',
        backgroundColor:'white',
    },
    boxBtn:{
        alignItems: 'center',
        justifyContent:'center',
      
    },
    loginButton:{
        padding:15,
        margin:15,
        borderRadius:20,
        backgroundColor:colores.COLOR_MORADO
    },
    createBtn:{
        padding:15,
        margin:15,
        borderRadius:20,
        backgroundColor:colores.COLOR_VERDE
    },
    buttonText:{
        color:colores.COLOR_BLANCO,
        textAlign:'center',
        fontSize:15,
    }
});
