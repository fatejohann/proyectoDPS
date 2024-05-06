import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import colores from "../../utils/colores";

import { collection, getDocs,addDoc,doc ,writeBatch} from "firebase/firestore";
import { db } from '../../firebase/credenciales';
import { useNavigation } from '@react-navigation/native';
import imagenProfesor from '../../utils/img/profesor.png'
import { useEffect, useState } from 'react';


export default function IngresarActividades({ route }){

    const { materia } = route.params; 

    const [nombreActividad, setNombreActividad] = useState('');
    const [porcentaje, setPorcentaje] = useState('');

    const handleGuardarActividad = async () => {
          // Inicia un batch de escritura
        const batch = writeBatch(db);
        try {
            // Agrega la nueva actividad
        const actividadRef = doc(collection(db, `materias/${materia.id}/actividades`));
        batch.set(actividadRef, {
            actividad: nombreActividad,
            porcentaje: parseInt(porcentaje, 10),
        });

        // Agrega un documento de notas para esta actividad
        const notasRef = doc(collection(db, `materias/${materia.id}/actividades/${actividadRef.id}/notas`));
        batch.set(notasRef, {
            valor: 0.0
        });
           // Commit del batch
           await batch.commit();
           alert('Actividad guardada correctamente');
        } catch (e) {
            alert('Error al agregar documento: ' + e);
        }
    };

    return(
        <View style={styles.container}>
        <ComponentHeader
            textHeader="Calificaciones" 
            descrip={`Añadir actividades para la materia: ${materia.nombreMateria}`}
            textFooter="Ingresa la informacion Correspondiente"
            imagen={imagenProfesor}
        />
        <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la actividad"
                    onChangeText={setNombreActividad}
                    value={nombreActividad}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Porcentaje"
                    keyboardType="numeric"
                    onChangeText={setPorcentaje}
                    value={porcentaje.toString()}
                />
                <Button
                    title="Guardar Actividad"
                    onPress={handleGuardarActividad}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colores.COLOR_CELESTE,
    },  
    form: {
        backgroundColor: colores.COLOR_BLANCO,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});