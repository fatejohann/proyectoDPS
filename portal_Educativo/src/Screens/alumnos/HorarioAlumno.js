import ComponentHeader from "../../components/ComponentHeader";
import { StyleSheet, Text, View, Image, TextInput,Button, TouchableOpacity,Dimensions} from 'react-native';
import imagenAlumno from '../../utils/img/alumno.png'
import colores from "../../utils/colores";
import React, { useState } from 'react';
//Carrusel
import Carousel from 'react-native-snap-carousel';

import horario  from "../../utils/listahorarios";


const { width: screenWidth } = Dimensions.get('window');

export default function HorarioAlumno(){

    const [expanded, setExpanded] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const renderItem = ({ item, index }) => {
        const isExpanded = expanded && expandedIndex === index;
        return (
            <TouchableOpacity 
                style={styles.itemContainer}
                onPress={() => {
                    setExpanded(!isExpanded);
                    setExpandedIndex(index);
                }}>
                <Text style={styles.diaTitulo}>{item.dia}</Text>
                <Text style={styles.info}>Presiona para más información</Text>
                {isExpanded && (
                    item.clases.map((clase, id) => (
                        <View key={id} style={styles.claseDetail}>
                            <Text style={styles.materia}>{clase.materia}</Text>
                            <Text style={styles.horario}>{clase.horario}</Text>
                        </View>
                    ))
                )}
            </TouchableOpacity>
        );
    };
    
    return(
        <View style={styles.container}>
            <ComponentHeader
            textHeader="Horario" 
            descrip="Horario disponible semanal" 
            textFooter="Horario Semanal "
            imagen={imagenAlumno}
            />

            <View style={styles.boxHorario}>
                <Carousel
                    data={horario.horario}
                    sliderWidth={screenWidth}
                    itemWidth={250}
                    renderItem={renderItem}
                    layout='defaul'
                />
            </View>
        </View>      
    )
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: colores.COLOR_CELESTE,
    },
    boxHorario:{
        backgroundColor: colores.COLOR_BLANCO,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', 
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 40,
    }, 
    itemContainer: {
        backgroundColor: colores.COLOR_MORADO,
        borderRadius: 8,
        width: 250,
        minHeight: 150,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: colores.COLOR_BLANCO,
    },
    diaTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colores.COLOR_BLANCO,
    },
    info: {
        fontSize: 16,
        color: colores.COLOR_BLANCO,
        marginBottom: 5,
        fontFamily: 'JockeyOne',
    },
    claseDetail: {
        alignItems: 'center',
        marginTop: 5,
        color: colores.COLOR_BLANCO,
        fontFamily: 'JockeyOne',
    },
    materia: {
        fontSize:15,
        fontWeight: 'bold',
        color: colores.COLOR_BLANCO,     
        fontFamily: 'JockeyOne',
    },
    horario: {
        fontSize: 20,
        color: colores.COLOR_BLANCO,
        fontFamily: 'JockeyOne',
    },
});