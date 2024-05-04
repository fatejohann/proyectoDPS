import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import { db } from '../../firebase/credenciales';
import imagenProfesor from '../../utils/img/profesor.png'
import colores from '../../utils/colores';
export default function IngresarCalificaciones({ route }) {

    const { materia } = route.params;

    const [notas, setNotas] = useState({});

    const [actividades, setActividades] = useState();

    useEffect(() => {
        const loadActividades = async () => {
            if (materia && materia.id) {
                const actividadesSnapshot = await getDocs(collection(db, `materias/${materia.id}/actividades`));
                const actividadesConNotas = await Promise.all(
                    actividadesSnapshot.docs.map(async (docActividad) => {
                        const notasSnapshot = await getDocs(collection(db, `materias/${materia.id}/actividades/${docActividad.id}/notas`));
                        const notas = notasSnapshot.docs.map(docNota => ({
                            id: docNota.id,
                            ...docNota.data()
                        }));
                        return {
                            id: docActividad.id,
                            ...docActividad.data(),
                            notas
                        };
                    })
                );
                setActividades(actividadesConNotas);
            }
        };
        loadActividades();
    }, [materia]);

    //para manejar subir las notas
    const handleNotaChange = (actividadId, text) => {
        // Ensure the text is stored as a string in state
        setNotas(prevNotas => ({
            ...prevNotas,
            [actividadId]: text
        }));
    };
    
    const guardarNotas = async () => {
        for (const actividadId in notas) {
            const noteValue = notas[actividadId];
            const noteDocRef = doc(db, `materias/${materia.id}/actividades/${actividadId}/notas/noteId`); // Update 'noteId' accordingly
            try {
                await updateDoc(noteDocRef, { valor: noteValue });
                console.log("Nota actualizada correctamente");
            } catch (error) {
                console.error("Error al actualizar la nota: ", error);
            }
        }
        alert('Notas actualizadas correctamente');
    };



    return (

        <View style={styles.container}>
            <ComponentHeader
                textHeader="Calificaciones"
                descrip="Informacion del alumno: Alumno 1, Algebra"
                textFooter="Ingresa la nota segun actividad "
                imagen={imagenProfesor}
            />
            <View style={styles.boxActividades}>
                <Text style={styles.TextActividades}>
                    Actividades
                </Text>
                <Button title="Guardar Notas" onPress={guardarNotas} />

                {actividades && actividades.map(actividad => (
                    <View key={actividad.id} style={styles.Actividades}>
                        <View style={styles.ingresoNota}>
                            <Text style={styles.Actividades_text}>
                                {actividad.actividad}  
                            </Text>
                            <Text style={styles.Actividades_text}>
                                Ingresa la nota
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="nota"
                                value={notas[actividad.id] ? notas[actividad.id].toString() : ''}
                                onChangeText={(text) => handleNotaChange(actividad.id, text)}
                            />
                        </View>
                        <View style={styles.notaActual}>
                            <Text style={styles.Actividades_text}>
                                Nota Actual
                            </Text>
                            <Text style={styles.Actividades_text}>
                            {notas[actividad.id] ? notas[actividad.id].score : 'N/A'} 
           
                            </Text>
                        </View>
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
    boxActividades: {
        backgroundColor: colores.COLOR_BLANCO,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    TextActividades: {
        position: 'absolute',
        fontSize: 20,
        left: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },

    btnSubirNotas: {
        position: 'absolute',
        fontSize: 20,
        left: 250,
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: colores.COLOR_VERDE,
        padding: 10,
        borderRadius: 10,
        color: colores.COLOR_BLANCO,
    },
    Actividades: {
        width: 300,
        height: 130,
        backgroundColor: colores.COLOR_MORADO,
        borderRadius: 10,

        marginTop: 80,
        justifyContent: "center",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    ingresoNota: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    notaActual: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        width: 120,
        borderColor: '#ccc',
        padding: 5,
        borderRadius: 10,
        backgroundColor: colores.COLOR_BLANCO,
        marginBottom: 10,
    },
    Actividades_text: {
        color: colores.COLOR_BLANCO,
        fontSize: 20,
        fontFamily: "JockeyOne",
    }
});