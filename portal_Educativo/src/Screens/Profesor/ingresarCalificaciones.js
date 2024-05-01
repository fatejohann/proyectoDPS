import { StyleSheet, Text, View, Image, TextInput,Button, TouchableOpacity} from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import imagenProfesor from '../../utils/img/profesor.png'
import colores from '../../utils/colores';
export default function ingresarCalificacion(){

    const [notaParcial1, setNotaParcial1] = useState('0.0');
    const [notaParcial2, setNotaParcial2] = useState('0.0');

    return(

        <View style={styles.container}>
            <ComponentHeader
            textHeader="Calificaciones" 
            descrip="Informacion del alumno: Alumno 1, Algebra" 
            textFooter="Ingresa la nota segun actividad "
            imagen={imagenProfesor}
             />
             <View style={styles.boxActividades} >
    
             <Text style={styles.TextActividades}>
             Actividades
            </Text>
            
            <Text style={styles.btnSubirNotas}>
             Subir notas
            </Text>

            {/*BOX PARA SUBIR LAS NOTAS DE CADA ACTIVIDAD */}
            <View style={styles.Actividades} >

            <View style={styles.ingresoNota}>
                 <Text style={styles.Actividades_text}>
                    Parcial 1 
                </Text>
                
                <Text style={styles.Actividades_text}>
                    Ingresa la nota 
                </Text>
                <TextInput
                 style={styles.input}
                 placeholder="nota"
                 value={notaParcial1}
                 onChangeText={setNotaParcial1}
                />
                
            </View>

            <View  style={styles.notaActual}>
                <Text style={styles.Actividades_text}>
                   Nota Actual
                </Text>
                
                <Text style={styles.Actividades_text}>
                   {notaParcial1}
                </Text>
            </View>
             </View>

            {/*BOX PARA SUBIR LAS NOTAS DE CADA ACTIVIDAD */}
             <View style={styles.Actividades} >

            <View style={styles.ingresoNota}>
                 <Text style={styles.Actividades_text}>
                    Parcial 2
                </Text>
                
                <Text style={styles.Actividades_text}>
                    Ingresa la nota 
                </Text>
                <TextInput
                 style={styles.input}
                 placeholder="nota"
                 value={notaParcial2}
                 onChangeText={setNotaParcial2}
                />
                
            </View>

            <View  style={styles.notaActual}>
                <Text style={styles.Actividades_text}>
                   Nota Actual
                </Text>
                
                <Text style={styles.Actividades_text}>
                   {notaParcial2}
                </Text>
            </View>
             </View>
             
            
             </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container:{
       backgroundColor:colores.COLOR_CELESTE,
    },
    boxActividades:{
        backgroundColor:colores.COLOR_BLANCO,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,        
        height:'100%',
        flexDirection: 'row', 
        flexWrap: 'wrap',  
        justifyContent: 'space-evenly'
    },
    TextActividades:{
        position:'absolute',
        fontSize:20,
        left:40,
        fontWeight: 'bold',
        marginTop:10,
    }, 

    btnSubirNotas:{
        position:'absolute',
        fontSize:20,
        left:250,
        fontWeight: 'bold',
        marginTop:10,
        backgroundColor:colores.COLOR_VERDE,
        padding:10,
        borderRadius:10,
        color:colores.COLOR_BLANCO,
    },
    Actividades:{
        width:300,
        height:130,
        backgroundColor:colores.COLOR_MORADO,
        borderRadius:10,
      
        marginTop:80,
        justifyContent:"center",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row', 
    },
    ingresoNota:{
        flex:1,
        padding:10,
        alignItems: 'center',
    },
    notaActual: {
        flex: 1, 
        padding: 10,    
        alignItems: 'center',
    },
      input: {
        borderWidth: 1,
        width:120,
        borderColor: '#ccc',
        padding: 5,
        borderRadius:10,
        backgroundColor:colores.COLOR_BLANCO,
        marginBottom: 10,
      },
    Actividades_text:{
        color:colores.COLOR_BLANCO,
        fontSize:20,
        fontFamily:"JockeyOne",
    }
});