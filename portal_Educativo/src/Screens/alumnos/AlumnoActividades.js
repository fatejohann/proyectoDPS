
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons desde '@expo/vector-icons'
import colores from "../../utils/colores";
import ComponentHeader from "../../components/ComponentHeader";
//Images
import imagenAlumno from '../../utils/img/alumno.png'
import horario from '../../utils/img/horario.png'
import calificaciones from '../../utils/img/calificaciones.png'

import actividades from '../../utils/img/actividades.png'

export default function AlumnoActividades() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Algebra' },
    { id: 2, name: 'Programacion orientada a objetos' },
    { id: 3, name: 'Pensamiento social cristiano' },
    { id: 4, name: 'Otras mas jkssa' },
  ]);
  const [activities, setActivities] = useState([
    { id: 1, name: 'Actividad 1', text: 'Nota actual', entrega:'13/04/2024', Estado:'Enviado',  grade: 0.0 },
    { id: 2, name: 'Actividad 2', text: 'Nota actual', entrega:'05/05/2024', Estado:'Pendiente',  grade: 0.0 },
  ]);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  const handleGoBack = () => {
    setSelectedSubject(null);
  };

  const renderSubject = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectButton}
      onPress={() => handleSubjectSelect(item)}
    >
      <Text style={styles.subjectButtonText}>{item.name}</Text>
      <Text style={styles.viewNotes}>Ver actividades</Text>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }) => (
  <View style={styles.activityContainer}>
    <Text style={styles.activityName}>{item.name}</Text>
    <Text style={styles.activityEntrega}>Fecha de entrega: {item.entrega}</Text>
    <Text style={styles.activityEstado}>Estado: {item.Estado}</Text>
    <Text style={styles.activityGrade}>Nota Actual: {item.grade}</Text>
  </View>
);

  return (
    
    <View style={styles.BoxBtn}>
    <ComponentHeader 
            textHeader="Hola Alumno" 
            descrip="Bienvenido Alumno, ¿Que desea Realizar?" 
            textFooter="Opciones Disponibles"
            imagen={imagenAlumno}/>

      <View style={styles.headerContainer}>
        {selectedSubject ? (
          <TouchableOpacity onPress={handleGoBack} style={styles.goBackContainer}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyHeaderSpace} />
        )}
        <Text style={styles.header}>Actividades</Text>
        
      </View>
      {selectedSubject ? (
        <>
          <Text style={styles.subHeader}>Actividades disponibles</Text>
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <>
          <Text style={styles.subHeader}>Selecciona la materia la cual quieres revisar tus actividades</Text>
          <FlatList
            data={subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
      BoxBtn: {
    backgroundColor: colores.COLOR_BLANCO,
    height: "100%",
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 20,
    alignItems: "center",
    justifyContent: "start",
    flexDirection: "column",
  },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black', // Texto blanco
      marginBottom: 20,
    },
    subHeader: {
      fontSize: 18,
      color: 'black', // Texto blanco
      marginBottom: 10,
      
      
    },
    subjectButton: {
      backgroundColor: '#fff', // Botón blanco
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10, // Bordes redondeados
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#000', // Sombra
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Elevación en Android
    },
    subjectButtonText: {
      fontSize: 16,
      color: '#4285F4', // Texto azul
      fontWeight: 'bold', // Negrita
    },
    viewNotes: {
      fontSize: 14,
      color: '#4285F4', // Texto azul
    },
    activityContainer: {
      backgroundColor: '#fff', // Fondo blanco
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10, // Bordes redondeados
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#000', // Sombra
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Elevación en Android
    },
    activityName: {
      fontSize: 16,
      color: '#4285F4', // Texto azul
      fontWeight: 'bold', // Negrita
    },
    activityGrade: {
      fontSize: 16,
      color: '#4285F4', // Texto azul
    },
    activityEntrega: {
      fontSize: 16,
      color: '#4285F4', // Texto azul
    },
    activityEstado: {
      fontSize: 16,
      color: '#4285F4', // Texto azul
    },
    goBackContainer: {
      padding: 10,
    },
    emptyHeaderSpace: {
      width: 30, // Ancho igual al tamaño del icono
    },
  });