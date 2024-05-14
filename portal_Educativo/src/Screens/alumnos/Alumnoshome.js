import React from "react";

import { StyleSheet, Text, View, Image, TextInput,Button, TouchableOpacity} from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import colores from "../../utils/colores";

//Images
import imagenAlumno from '../../utils/img/alumno.png'
import horario from '../../utils/img/horario.png'
import calificaciones from '../../utils/img/calificaciones.png'

import actividades from '../../utils/img/actividades.png'

import { useNavigation } from '@react-navigation/native';


export default function AlumnosHome(){

 const navigation = useNavigation();

 const irACalificacion=()=>{
    navigation.navigate('AlumnoCalificaciones')
 }
 
 const irAActividades=()=>{
   navigation.navigate('AlumnoActividades')
 }

 
 const irAHorario=()=>{
    navigation.navigate('HorarioAlumno')
 }

    return(
        <View style={styles.container}>

        <ComponentHeader 
            textHeader="Hola Estudiante" 
            descrip="Bienvenido Estudiante, ¿Que desea Realizar?" 
            textFooter="Opciones Disponibles"
            imagen={imagenAlumno}/>

            <View style={styles.BoxBtn}>

                <View style={styles.btnHorario}>
                <TouchableOpacity onPress={irAHorario}>
                    <Text style={styles.Text}>HORARIO DE CLASE</Text>
                    </TouchableOpacity>
                    <Image 
                    source={horario}
                    style={styles.ImgBtn}/>
                </View>

                <View style={styles.btnCalificaciones}>
                    
                    <TouchableOpacity onPress={irACalificacion}>
                    <Text style={styles.Text}>Ver mis calificaciones</Text>
                    </TouchableOpacity>
                    <Image 
                    source={calificaciones}
                    style={styles.ImgBtn}/>
                </View>
                
                <View style={styles.btnActividades}>
                  <TouchableOpacity onPress={irAActividades}>
                      <Text style={styles.Text}>Ver Actividades</Text>
                      </TouchableOpacity>
                      <Image 
                      source={actividades}
                      style={styles.ImgBtn}/>
                      </View>
                
            </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
       backgroundColor:colores.COLOR_CELESTE,
    },
    BoxBtn: {
        backgroundColor:colores.COLOR_BLANCO,
        height:"100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        alignItems:"center",
        justifyContent:"start",
        flexDirection:"column",
    },
    btnHorario:{
        flexDirection:"row",
        width:"80%",
        height:"10%",
        backgroundColor:colores.COLOR_VERDE,
        borderRadius:10,
        margin:30,
        alignItems: 'center',
        justifyContent:"space-around",
    },
    Text:{
        color:colores.COLOR_BLANCO,
        fontSize:25,
        fontFamily:"JockeyOne",
    },  
    ImgBtn:{
        width:100,
        height:100
    },
    btnCalificaciones:{
        flexDirection:"row",
        width:"80%",
        height:"10%",
        backgroundColor:colores.COLOR_MORADO,
        borderRadius:10,
        margin:30,
        alignItems: 'center',
        justifyContent:"space-around",
    },
    btnActividades:{
        flexDirection:"row",
        width:"80%",
        height:"10%",
        backgroundColor:colores.COLOR_ANARANJADO,
        borderRadius:10,
        margin:30,
        alignItems: 'center',
        justifyContent:"space-around",
    },
});
    