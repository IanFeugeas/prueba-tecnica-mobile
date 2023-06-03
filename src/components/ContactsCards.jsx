import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import contactsActions from '../store/Contacts/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import contactClickActions from "../store/Contacts/actions"
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const { read_contacts, delete_contacts } = contactsActions
const { contactClicked } = contactClickActions

function ContactsCards() {
    let contacts = useSelector(store => store.contacts.contacts)
    let text = useSelector(store => store.text.text) // TEXTO DEL BUSCADOR
    let [text1,setText1] = useState(useSelector(store => store.text.text))
    const dispatch = useDispatch()
    let [token,setToken] = useState('')

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []));
    
    function getContacts(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(read_contacts({inputText: text, headers }))
    }

    const navigation = useNavigation()

    function handleDetails(e, id) {
            navigation.navigate('Informacion');
    }

    function handleEdit(id) {
      navigation.navigate('Editar', {id});   
    }

    function handleNavigate(e) {
            navigation.navigate('Agregar');
    }

    async function handleDelete(id){
        const token = await AsyncStorage.getItem('token');
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(delete_contacts({id, headers}))
    }

    useEffect( () => {
        setText1(text)
        getContacts(token)
    }, [text, token]);

    return (
        <ScrollView>
            <View style={styles.titleadd}>
                <View>
                    <Text style={styles.title}> Lista de contactos</Text>
                </View>    
                <View style={styles.add}>
                    <TouchableOpacity style={styles.cardBtn} onPress={(event) => handleNavigate(event)}>
                        <MaterialIcons name="person-add" size={40} color='#1E90FF'/>
                    </TouchableOpacity>
                </View>    
            </View>       
        <View style={styles.contactsCards}>
            {
                contacts.length ? contacts.map((contact, i) => {
                    let card =
                    <ScrollView>
                        <View style={styles.card} key={i}>
                            <View style={styles.cardText}>
                                <View className='text' style={styles.info}>
                                    <View style={styles.name}>
                                        <Text style={styles.cardTitle}>{contact.name + " " + contact.last_name}</Text>
                                        <Text style={styles.phone}>{contact.phone}</Text>
                                    </View>
                                    <View style={styles.bottom}>
                                        <TouchableOpacity style={styles.cardBtn} onPress={() => handleEdit(contact._id)}>
                                            <MaterialIcons name="edit" size={20} color='#1E90FF' />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBtn} onPress={(event) => handleDetails(event, contact._id)}>
                                            <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={20} color='#1E90FF' />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBtn} onPress={() => handleDelete(contact._id)}>
                                            <MaterialCommunityIcons name="trash-can" size={20} color='#1E90FF' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    return card
                }) : <Text>No se encontraron clientes</Text>
            }
            
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contactsCards: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: 30
    },
    lista: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleadd: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 40
    },
    title: {
        fontSize: 30,
        color: '#1E90FF',
        paddingTop: 20,
        paddingLeft: 10,
        
    },
    add: {
        paddingRight: 20,
        paddingTop: 20
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    name: {
        marginLeft: 10,
        gap: 5,
        width: "55%"
    },
    phone: {
        color: '#1E90FF',
        fontSize: 20,
    },
    cardText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: '100%',
        height: '100%',
        gap: 15,
    },
    cardTitle: {
        fontSize: 20,
        color: 'black',
    },
    bottom: {
        display: "flex",
        flexDirection: "row",
    },
    cardBtn: {
        textDecorationLine: 'none',
        width: 40,
        height: 35,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default ContactsCards