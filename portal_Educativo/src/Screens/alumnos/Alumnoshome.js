import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons desde '@expo/vector-icons'

export default function AlumnosHome() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Nombre 1' },
    { id: 2, name: 'Nombre 2' },
    { id: 3, name: 'Nombre 3' },
    { id: 4, name: 'Nombre 4' },
  ]);
  const [activities, setActivities] = useState([
    { id: 1, name: 'Actividad 1', grade: 0.0 },
    { id: 2, name: 'Actividad 2', grade: 0.0 },
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
      <Text style={styles.viewNotes}>Ver notas</Text>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityName}>{item.name}</Text>
      <Text style={styles.activityGrade}>Nota Actual: {item.grade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {selectedSubject ? (
          <TouchableOpacity onPress={handleGoBack} style={styles.goBackContainer}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyHeaderSpace} />
        )}
        <Text style={styles.header}>Calificaciones</Text>
        <TouchableOpacity style={styles.userIconContainer}>
          <Ionicons name="person-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {selectedSubject ? (
        <>
          <Text style={styles.subHeader}>Calificaciones disponibles</Text>
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <>
          <Text style={styles.subHeader}>Selecciona la materia la cual quieres revisar tus notas</Text>
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
    container: {
      flex: 1,
      backgroundColor: '#4285F4', // Color de fondo azul
      padding: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff', // Texto blanco
      marginBottom: 20,
    },
    subHeader: {
      fontSize: 18,
      color: '#fff', // Texto blanco
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
    userIconContainer: {
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#4285F4', // Color de fondo azul
    },
    goBackContainer: {
      padding: 10,
    },
    emptyHeaderSpace: {
      width: 24, // Ancho igual al tamaño del icono
    },
  });
