import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import bottomTabsActions from '../store/ReloadBottomTabs/actions';
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

const { reloadBottomTabs } = bottomTabsActions

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoginForm({ setRender }){

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    let state = useSelector(store => store.bottomTabsReducer.state)

    let dispatch = useDispatch()

    async function handleSignIn() {
        setLoading(true)

        let data = {
            email: email,
            password: password
        }
        let url = 'https://prueba-tecnica-minicrm.onrender.com/auth/signin'

        try {
            await axios.post(url, data).then(res => {
                AsyncStorage.setItem('token', res.data.token)
                AsyncStorage.setItem('user', JSON.stringify({
                    id: res.data.user._id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                }))
                dispatch(reloadBottomTabs({ state: !state }))
                setLoading(false)
                setTimeout(() => navigation.navigate('Home'), 1000)
            })
            console.log('Login Successful')
        } catch (error) {
            setLoading(false)
            console.log('ERROR' + error)
        }
    }

    return(
        <ScrollView style={styles.login}>
            <View style={styles.loginContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeSectionH2}>Bienvenid@s </Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Email</Text>
                        <TextInput name="email" id="email" style={styles.input} onChangeText={inputText => setEmail(inputText)} />
                    </View>
                    <View style={styles.fieldset} id='field-password'>
                        <Text style={styles.legend}>Password</Text>
                        <TextInput secureTextEntry={true} name="password" id="password" style={styles.input} onChangeText={inputText => setPassword(inputText)} />
                    </View>
                    <TouchableOpacity style={styles.sign} onPress={handleSignIn}><Text style={styles.signText} >Ingresá</Text ></TouchableOpacity>

                    <Text style={styles.loginText}>No tienes cuenta? <Text style={styles.link} onPress={() => { setRender('register') }}>Registrate</Text></Text>
                </View>
            </View>
            <Spinner visible={loading} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    login: {
        width: windowWidth,
        height: windowHeight,
        paddingTop: '50%'
    },
    loginContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 25,
        padding: 15,
        gap: 25,
    },
    welcomeSectionH2:{
        fontSize: 40
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
        backgroundColor: '#1E90FF',
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

export default LoginForm