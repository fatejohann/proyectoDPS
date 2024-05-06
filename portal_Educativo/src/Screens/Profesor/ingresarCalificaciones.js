import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import { db } from '../../firebase/credenciales';
import imagenProfesor from '../../utils/img/profesor.png'
import colores from '../../utils/colores';
export default function IngresarCalificaciones({ route }) {

    const navigation = useNavigation();

    const { materia, alumno } = route.params;

    const [notas, setNotas] = useState({});

    const [actividades, setActividades] = useState();

    useEffect(() => {
        const fetchActividadesConNotas = async () => {
            const actividadesRef = collection(db, `materias/${materia.id}/actividades`);
            const actividadesSnapshot = await getDocs(actividadesRef);
            const actividadesList = await Promise.all(actividadesSnapshot.docs.map(async doc => {
                const notasRef = collection(db, `materias/${materia.id}/actividades/${doc.id}/notas`);
                const notasSnapshot = await getDocs(notasRef);
                const notas = notasSnapshot.docs.map(notaDoc => ({
                    id: notaDoc.id,
                    ...notaDoc.data()
                }));
                return {
                    id: doc.id,
                    ...doc.data(),
                    notas: notas
                };
            }));
            setActividades(actividadesList);
        };

        fetchActividadesConNotas();
    }, [materia]);

    const handleNotaChange = (nota, actividadId, notaId) => {
        const valorNota = parseFloat(nota);
          // Primero verificamos que el valor esté dentro del rango permitido
    if (valorNota < 0 || valorNota > 10) {
        alert('La nota debe estar entre 0 y 10');
        return;
    }

   // Verificación de precisión decimal
   if (!/^\d+(\.\d{1,3})?$/.test(nota)) {
    alert('La nota no puede tener más de tres decimales');
    return;
}

    // Actualizamos el estado solo si las validaciones son correctas
    setNotas(prevNotas => ({
        ...prevNotas,
        [actividadId]: {
            ...prevNotas[actividadId],
            [notaId]: valorNota 
        }
    }));

    };

    const guardarNotas = async () => {
        try {
            for (const [actividadId, actividadNotas] of Object.entries(notas)) {
                for (const [notaId, notaValor] of Object.entries(actividadNotas)) {
                    const notaRef = doc(db, `materias/${materia.id}/actividades/${actividadId}/notas/${notaId}`);
                    await updateDoc(notaRef, { valor: notaValor });
                }
            }
            alert('Notas guardadas correctamente!');

            navigation.navigate('Calificaciones');
        } catch (error) {
            console.error('Error al guardar notas:', error);
            alert('Error al guardar notas');
        }

    };

    return (
        <View style={styles.container}>
            <ComponentHeader
                textHeader="Calificaciones"
                descrip={`Información del alumno: Nombre: ${alumno.nombre}, Materia: ${materia.nombreMateria}`}
                textFooter="Selecciona alumno"
                imagen={imagenProfesor}
            />

            <View style={styles.boxActividades}>
                <Text style={styles.TextActividades}>Actividades</Text>
                <Button title="Guardar Notas" onPress={guardarNotas} />

                {actividades && actividades.map(actividad => (
                    <View key={actividad.id} style={styles.Actividades}>
                        {actividad.notas.map(nota => (
                            <View key={nota.id} style={styles.ingresoNota}>

                                <Text style={styles.Actividades_text}>{actividad.actividad}</Text>

                                <Text style={styles.Actividades_text}>Ingresa la nota</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Ingresa nota"
                                    onChangeText={(text) => handleNotaChange(text, actividad.id, nota.id)}
                                    value={notas[actividad.id] && notas[actividad.id][nota.id] || ''}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.Actividades_text}>
                                    Nota Actual: {nota.valor}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );

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
        height: 150,
        backgroundColor: colores.COLOR_MORADO,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 80,
        justifyContent: "center",
        alignItems: 'center',
        justifyContent: 'space-evenly',
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