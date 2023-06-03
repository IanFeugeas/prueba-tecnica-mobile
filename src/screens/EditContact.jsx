import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import axios from 'axios'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import contactsActions from '../store/Contacts/actions'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EditContact() {
    const { edit_contact } = contactsActions
    const route = useRoute();
    const contactId = route.params.id;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(" ");
    const [last_name, setLastName] = useState(" ");
    const [phone, setPhone] = useState(" ")
    const [email, setEmail] = useState(" ");
    const [date, setDate] = useState(" ");
    const [address, setAddress] = useState(" ");
    const [type, setType] = useState(" ");
    const [origin, setOrigin] = useState(" ")
    const dispatch = useDispatch()
    let [token,setToken] = useState('')

    const navigation = useNavigation()

    async function handleEdit(id) {
        console.log(id);
        const editedData = {};
      
        if (name !== " ") {
          editedData.name = name;
        }
      
        if (last_name !== " ") {
          editedData.last_name = last_name;
        }
      
        if (phone !== " ") {
          editedData.phone = phone;
        }
      
        if (email !== " ") {
          editedData.email = email;
        }
      
        if (date !== " ") {
          editedData.date = date;
        }
      
        if (address !== " ") {
          editedData.address = address;
        }
      
        if (type !== " ") {
          editedData.type = type;
        }
      
        if (origin !== " ") {
          editedData.origin = origin;
        }
      
        const token = await AsyncStorage.getItem('token');
        let headers = { headers: { 'Authorization': `Bearer ${token}` } };
        dispatch(edit_contact({ id, body: editedData, headers }));
        navigation.navigate("Clientes");
      }

    async function handleReturn(){

            navigation.navigate('Clientes')
    }

    return (
        <ScrollView style={styles.editForm}>
            <View style={styles.editContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeSectionH2}>Editar contacto</Text>
                </View>
                <View style={styles.form}>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Nombres </Text>
                        <TextInput name="name" id="name" style={styles.input} onChangeText={inputText => setName(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Apellidos </Text>
                        <TextInput name="last_name" id="last_name" style={styles.input} onChangeText={inputText => setLastName(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>E-mail</Text>
                        <TextInput name="email" id="email" style={styles.input} onChangeText={inputText => setEmail(inputText)} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Tel/Cel </Text>
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
                    <View style={styles.btnEdit}>
                        <TouchableOpacity style={styles.add} onPress={handleReturn}><Text style={styles.addText} >Cancelar</Text ></TouchableOpacity>

                        <TouchableOpacity style={styles.add} onPress={() => handleEdit(contactId)}><Text style={styles.addText} >Guardar</Text ></TouchableOpacity>
                    </View>
                    
            
                  
                </View>
            </View>
            <Spinner visible={loading} />
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    editForm: {
        width: windowWidth,
        height: windowHeight,
    },
    editContent: {
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
    btnEdit: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 50
    },
    add: {
        width: 160,
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