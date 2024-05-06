import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import colores from "../../utils/colores";

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/credenciales';
import { useNavigation } from '@react-navigation/native';
import imagenProfesor from '../../utils/img/profesor.png'
import { useEffect, useState } from 'react';

export default function Actividades() {

    const navigation = useNavigation();

    const [materias, setMaterias] = useState([]);


    async function getMaterias() {
        try {
            const materiasSnapshot = await getDocs(collection(db, 'materias'));
            const materiasArray = materiasSnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setMaterias(materiasArray);
            console.log(materiasArray);
        } catch (error) {
            console.error("Error al obtener los documentos: ", error);
        }
    }


    useEffect(() => {
        getMaterias();
    }, []);


    const irAIngresarActividades = (materia) => {
        navigation.navigate('IngresarActividades', { materia });
    }
    


    return (
        <View style={styles.container}>
            <ComponentHeader
                textHeader="Calificaciones"
                descrip="Selecciona una materia para subir actividades"
                textFooter="Selecciona una Materia"
                imagen={imagenProfesor}
            />

            <View style={styles.boxMaterias}>
                {materias.map(materia => (
                    <TouchableOpacity key={materia.id} style={styles.materias} onPress={() => irAIngresarActividades(materia)}>
                        <Text style={styles.TextMateria}>
                            {materia.nombreMateria}
                        </Text>
                        <Text style={styles.materias_Text}>
                            subir Actividad
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

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
        fontSize: 20,
        fontWeight: 'bold',
        color:colores.COLOR_BLANCO,
    },
    materias: {
        width: 140,
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
        marginTop:10,
        fontFamily: "JockeyOne",
    }
});