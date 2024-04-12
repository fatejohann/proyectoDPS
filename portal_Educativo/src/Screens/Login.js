
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput,Button, TouchableOpacity} from 'react-native';

//Para las tener los colores en variables
import colores from '../utils/colores';

//Exportamos la imagen del login
import ImagenLogin from '../utils/img/login.png'

export default function Login() {
    return (
     
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>PORTAL EDUCATIVO</Text>
            <Text style={styles.text}>BIENVENIDO</Text>
            <Image source={ImagenLogin} />
        </View>

        <View style={styles.content}>
            <Text style={styles.contentText}>Ingresa tus datos</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput placeholder='Ingresa tu nombre' style={styles.input}/>
                
                <Text style={styles.label}>Contraseña:</Text>
                <TextInput placeholder=' Ingresa tu Contraseña' style={styles.input}/>

                <View style={styles.boxBtn}>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    </View>
           
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colores.COLOR_CELESTE,
        
    },
    header:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color:'white',
        fontSize:25,
        margin:10,
        fontFamily:'JockeyOne',
    },
    text:{
        color:'white',
        fontSize:45,
        margin:10,
        fontFamily:'JockeyOne',
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex:3,
        backgroundColor: colores.COLOR_BLANCO,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 40, 
        alignItems: 'center',
        justifyContent: 'start', 
    },
    contentText:{
        fontSize: 25,
        marginRight:100,
        fontWeight: 'bold',
    },
    inputContainer:{
        paddingTop:50,
        alignItems: 'end',
        justifyContent:'center',
    },
    label: {
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold',
    },
    input:{
        width:250,
        fontSize: 20,
        borderWidth:3,
        borderRadius:20,
        padding:10,
        margin:10,
        borderColor:'white',
        backgroundColor:'white',
    },
    boxBtn:{
        alignItems: 'center',
        justifyContent:'center',
      
    },
    loginButton:{
        width:"50",
        padding:15,
        margin:15,
        borderRadius:20,
        backgroundColor:colores.COLOR_MORADO
    },
    buttonText:{
        color:colores.COLOR_BLANCO,
        textAlign:'center',
        fontSize:15,
    }
});
