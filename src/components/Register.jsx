import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function RegisterForm({setRender}) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('');

    const navigation = useNavigation()
    async function handleSignUp() {
        setLoading(true)

        let data = {
            name: name,
            email: email,
            password: password
        }

        let url = 'https://prueba-tecnica-minicrm.onrender.com/auth/signup'
        try {
            await axios.post(url, data)
            setLoading(false)
            alert('Register Successful');
            console.log('Register Successful')
            setTimeout(() => navigation.navigate('login'), 4000)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <ScrollView style={styles.register}>
            <View style={styles.registerContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeSectionH2}>Bienvenid@!</Text>
                    <Text style={styles.welcomeSectionP}>Completa los datos para crear una cuenta.</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Nombre</Text>
                        <TextInput name="name" id="name" style={styles.input} onChangeText={inputText => setName(inputText)} />
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Email</Text>
                        <TextInput name="email" id="email" style={styles.input} onChangeText={inputText => setEmail(inputText)} />
                    </View>
                    <View style={styles.fieldset} id='field-password'>
                        <Text style={styles.legend}>Contraseña</Text>
                        <TextInput secureTextEntry={true} name="password" id="password" style={styles.input} onChangeText={inputText => setPassword(inputText)} />
                    </View>

                    <TouchableOpacity style={styles.sign} onPress={handleSignUp}><Text style={styles.signText} >Registrate</Text ></TouchableOpacity>
                    <Text style={styles.loginText}>Ya tienes una cuenta? <Text style={styles.link} onPress={() => {setRender('login')}}>Ingresa</Text></Text>
                  
                </View>
            </View>
            <Spinner visible={loading} />
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    register: {
        width: windowWidth,
        height: windowHeight,
        paddingTop: '50%'
    },
    registerContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 25,
        padding: 15,
        gap: 25,
    },
    welcomeSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 15,
        width: '100%'
    },
    welcomeSectionH2: {
        textAlign: 'center',
        width: '100%',
        height: 60,
        fontWeight: '600',
        fontSize: 32,
    },
    welcomeSectionP: {
        textAlign: 'center',
        width: '100%',
        fontWeight: '600',
        fontSize: 12,
        color: '#1f1f1fbf'
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 22
    },
    fieldset: {
        width: '100%',
        height: 48,
        backgroundColor: '#EBEBEB',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 10,
        position: 'relative',
        marginHorizontal: 'auto',
    },
    legend: {
        fontWeight: '400',
        fontSize: 12,
        backgroundColor: 'transparent',
        paddingLeft: 15,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor:'#1E90FF',
        color: '#EBEBEB',
        fontSize: 12,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        width: '90%',
        marginLeft: 15,
        height: 25
    },
    sign: {
        width: '100%',
        height: 48,
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        borderWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    signText: {
        color: '#EBEBEB',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.05,
        width: '100%',
        textAlign: 'center',
    },
    loginText: {
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'none',
        color: '#1E90FF',
        fontWeight: 'bold'
    }
})

export default RegisterForm