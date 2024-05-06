import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import colores from "../../utils/colores";

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/credenciales';
import { useNavigation } from '@react-navigation/native';
import imagenProfesor from '../../utils/img/profesor.png'
import { useEffect, useState } from 'react';

export default function Calificacion() {

    const navigation = useNavigation();

    const [materias, setMaterias] = useState([]);
 
    async function getMaterias() {
        try {
            const materiasSnapshot = await getDocs(collection(db, 'materias'));
            const materiasArray = [];
            for (const doc of materiasSnapshot.docs) {
                const materia = {
                    ...doc.data(),
                    id: doc.id,
                    alumnos: []
                };

                // Consulta a la subcolección 'alumnos' para cada materia
                const alumnosSnapshot = await getDocs(collection(db, `materias/${doc.id}/alumnos`));
                alumnosSnapshot.forEach(alumnoDoc => {
                    materia.alumnos.push({
                        ...alumnoDoc.data(),
                        id: alumnoDoc.id
                    });

                });

                materiasArray.push(materia);
            }
            setMaterias(materiasArray);
            console.log(materiasArray);
        } catch (error) {
            console.error("Error al obtener los documentos: ", error);
        }
    }

    useEffect(() => {
        getMaterias();
    }, []);


    //le pasamos como parametro la materia y alumno para poder ver todas sus actividades
    const irASubirCalificacion = (materia, alumno) => {
        navigation.navigate('IngresarCalificaciones', { materia, alumno });
    }
    
    
    

    return (
        <View style={styles.container}>
            <ComponentHeader
                textHeader="Calificaciones"
                descrip="Seleciona el alumno al que quieras ingresar alguna nota"
                textFooter="Selecciona alumno"
                imagen={imagenProfesor}
            />


            <View style={styles.boxMaterias}>
                {materias.map(materia => (
                    <View key={materia.id} style={styles.materiaContainer}>
                        <Text style={styles.TextMateria}>
                            {materia.nombreMateria}
                        </Text>
                        {materia.alumnos && materia.alumnos.map((alumno, index) => (
                            <View key={index} style={styles.materias}>
                                <Text style={styles.materias_Text}>
                                    {alumno.nombre}
                                </Text>
                                <TouchableOpacity onPress={() => irASubirCalificacion(materia, alumno)}>
                                    <Text style={styles.materias_Text}>
                                        Ver Actividades
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colores.COLOR_CELESTE,
    },
    boxMaterias: {
        backgroundColor: colores.COLOR_BLANCO,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    TextMateria: {
        position: 'absolute',
        fontSize: 20,
        left: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },
    materias: {
        width: 130,
        height: 130,
        backgroundColor: colores.COLOR_MORADO,
        borderRadius: 10,
        margin: 30,
        marginTop: 50,
        justifyContent: "center",
        alignItems: 'center',
    },
    materias_Text: {
        color: colores.COLOR_BLANCO,
        fontSize: 20,
        fontFamily: "JockeyOne",
    }
});