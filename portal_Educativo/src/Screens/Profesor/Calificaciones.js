import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import ComponentHeader from "../../components/ComponentHeader";
import colores from "../../utils/colores";

import { useNavigation } from '@react-navigation/native';
import imagenProfesor from '../../utils/img/profesor.png'
export default function Calificacion() {

    const navigation = useNavigation();

    const irASubirCalificacion = () => {
        navigation.navigate('ingresarCalificaciones')
    }

    return (
        <View style={styles.container}>
            <ComponentHeader
                textHeader="Calificaciones"
                descrip="Seleciona el alumno al que quieras ingresar alguna nota"
                textFooter="Selecciona alumno"
                imagen={imagenProfesor}
            />


            <View style={styles.boxMaterias} >

                <Text style={styles.TextMateria}>
                    Algebra
                </Text>

                <View style={styles.materias} >
                    <Text style={styles.materias_Text}>
                        Alumno 1
                    </Text>


                    <TouchableOpacity onPress={irASubirCalificacion}>
                        <Text style={styles.materias_Text}>
                            Ver Actividades
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.materias} >
                    <Text style={styles.materias_Text}>
                        Alumno 2
                    </Text>

                    <TouchableOpacity onPress={irASubirCalificacion}>
                        <Text style={styles.materias_Text}>
                            Ver Actividades
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.materias} >
                    <Text style={styles.materias_Text}>
                        Alumno 3
                    </Text>
                    <TouchableOpacity onPress={irASubirCalificacion}>
                        <Text style={styles.materias_Text}>
                            Ver Actividades
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.materias} >
                    <Text style={styles.materias_Text}>
                        Alumno 4
                    </Text>

                    <TouchableOpacity onPress={irASubirCalificacion}>
                        <Text style={styles.materias_Text}>
                            Ver Actividades
                        </Text>
                    </TouchableOpacity>
                </View>


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