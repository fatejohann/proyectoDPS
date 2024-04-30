import React from "react";
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, View, Image, Button,TouchableOpacity} from 'react-native';

import flecha from '../utils/img/flecha.png'
import colores from "../utils/colores";

export default function ComponentHeader ({textHeader,descrip, textFooter, imagen}){
    
 const navigation = useNavigation();
//Funcion para volver atras
const goBack =()=>{
    navigation.goBack();
}
    return(
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity onPress={goBack} style={styles.button}>
                    <Image source={flecha} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.text}>{textHeader}</Text>

                <Image source={imagen}
                style={styles.img}/>

            </View>
        
            <View  style={styles.boxDescrip}>
            <Text  style={styles.textDescrip}>{descrip}</Text>
            </View>

            <View>
            <Text style={styles.textFooter}>
                {textFooter} 
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
    height:'25%',
    backgroundColor:colores.COLOR_CELESTE,

    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
        marginTop:20,
        
    },
    img:{
        width:80,
        height:80
    },
    text:{
        color:colores.COLOR_BLANCO,
        fontSize:25,
        fontFamily:"JockeyOne",
       
    },
    boxDescrip:{
        width:"80%",
        height:"40%",
        backgroundColor:colores.COLOR_BLANCO,
        borderRadius:10,
        marginLeft:"10%",
        alignItems: 'center',
        justifyContent:"center"
    },
    textDescrip:{
        width:"75%",
        fontSize:25,
        fontFamily:"JockeyOne",
        textAlign:"center",
    },
    textFooter:{
        color:colores.COLOR_BLANCO,
        fontSize:25,
        fontFamily:"JockeyOne",
        margin:20
    }
});
    