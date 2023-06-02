import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EditContact({setRender}) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [phone, setPhone] = useState(" ")
    const [email, setEmail] = useState(" ");
    const [date, setDate] = useState(" ");
    const [address, setAddress] = useState(" ");
    const [type, setType] = useState(" ");
    const [origin, setOrigin] = useState(" ")

    const navigation = useNavigation()

    async function handleEdit() {
        setLoading(true)

        let data = {
            name: name,
            email: email,
            last_name: lastName,
            phone: phone,
            date: date,
            address: address,
            type_of_contact: type,
            origin: origin

        }

        let url = 'https://prueba-tecnica-minicrm.onrender.com/contacts/:id'
        try {
            await axios.post(url, data)
            setLoading(false)
            alert('Contacto editado correctamente');
            console.log('Edit contact Successful')
            setTimeout(() => navigation.navigate('Contactos'), 4000)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    async function handleReturn(){
        setTimeout( () => {
            navigation.navigate('Contactos');
        }, 100)
    }

    return (
        <ScrollView style={styles.register}>
            <View style={styles.registerContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeSectionH2}>Editar contacto</Text>
                </View>
                <View style={styles.form}>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Nombres *</Text>
                        <TextInput name="name" id="name" style={styles.input} onChangeText={inputText => setName(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Apellidos *</Text>
                        <TextInput name="lastName" id="lastName" style={styles.input} onChangeText={inputText => setLastName(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>E-mail</Text>
                        <TextInput name="email" id="email" style={styles.input} onChangeText={inputText => setEmail(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Tel/Cel *</Text>
                        <TextInput name="phone" id="phone" style={styles.input} onChangeText={inputText => setPhone(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Fecha de nacimiento</Text>
                        <TextInput name="date" id="date" style={styles.input} onChangeText={inputText => setDate(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Direccion</Text>
                        <TextInput name="address" id="address" style={styles.input} onChangeText={inputText => setAddress(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}></Text>
                        <TextInput name="date" id="date" style={styles.input} onChangeText={inputText => setDate(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Tipo de contacto</Text>
                        <TextInput name="type" id="type" style={styles.input} onChangeText={inputText => setType(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Origen</Text>
                        <TextInput name="origin" id="origin" style={styles.input} onChangeText={inputText => setOrigin(inputText)} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.add} onPress={handleReturn}><Text style={styles.addText} >Cancelar</Text ></TouchableOpacity>

                        <TouchableOpacity style={styles.add} onPress={handleEdit}><Text style={styles.addText} >Guardar</Text ></TouchableOpacity>
                    </View>
                    
            
                  
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
    add: {
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
    addText: {
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

export default EditContact