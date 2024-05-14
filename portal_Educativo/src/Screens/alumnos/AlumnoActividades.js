import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colores from "../../utils/colores";
import ComponentHeader from "../../components/ComponentHeader";
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase/credenciales';
import imagenAlumno from '../../utils/img/alumno.png';

export default function AlumnoActividades() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsCollection = collection(db, 'materias');
        const subjectsSnapshot = await getDocs(subjectsCollection);
        const subjectsData = subjectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error al obtener las materias:', error);
      }
    };

    fetchSubjects();
  }, []);

  const fetchActivities = async (subject) => {
    try {
      const subjectRef = doc(db, 'materias', subject.id);
      const activitiesCollection = collection(subjectRef, 'actividades');
      const activitiesSnapshot = await getDocs(activitiesCollection);
      const activitiesData = activitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSelectedSubject({ ...subject, activities: activitiesData });
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  };

  const handleSubjectSelect = (subject) => {
    fetchActivities(subject);
  };

  const handleGoBack = () => {
    setSelectedSubject(null);
  };

  const renderSubject = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectButton}
      onPress={() => handleSubjectSelect(item)}
    >
      <Text style={styles.subjectButtonText}>{item.nombreMateria}</Text>
      <Text style={styles.viewActivities}>Ver actividades</Text>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityName}>{item.nombre}</Text>
      <Text style={styles.activityEntrega}>Fecha de entrega: {item.fechaEntrega}</Text>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <ComponentHeader 
        textHeader="Hola Alumno" 
        descrip="Bienvenido Alumno, ¿Qué desea Realizar?" 
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
          <Text style={styles.subHeader}>Actividades disponibles para {selectedSubject.nombreMateria}</Text>
          <FlatList
            data={selectedSubject.activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <>
          <Text style={styles.subHeader}>Selecciona la materia para ver sus actividades</Text>
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
    backgroundColor: colores.COLOR_BLANCO,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colores.COLOR_CELESTE,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.COLOR_BLANCO,
  },
  subHeader: {
    fontSize: 18,
    color: colores.COLOR_AZUL,
    marginBottom: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subjectButton: {
    backgroundColor: colores.COLOR_BLANCO,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colores.COLOR_GRIS_CLARO,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subjectButtonText: {
    fontSize: 16,
    color: colores.COLOR_AZUL,
    fontWeight: 'bold',
  },
  viewActivities: {
    fontSize: 14,
    color: colores.COLOR_AZUL,
  },
  activityContainer: {
    backgroundColor: colores.COLOR_BLANCO,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: colores.COLOR_GRIS_CLARO,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityName: {
    fontSize: 16,
    color: colores.COLOR_AZUL,
    fontWeight: 'bold',
  },
  activityEntrega: {
    fontSize: 14,
    color: colores.COLOR_AZUL,
  },
  activityEstado: {
    fontSize: 14,
    color: colores.COLOR_AZUL,
  },
  activityGrade: {
    fontSize: 16,
    color: colores.COLOR_AZUL,
  },
  goBackContainer: {
    padding: 10,
  },
  emptyHeaderSpace: {
    width: 24,
  },
});
