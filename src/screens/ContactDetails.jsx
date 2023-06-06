import React from 'react'
import { Text, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import actions from "../store/OneContact/actions"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const { read_contact } = actions

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ContactDetails() {
    const route = useRoute();
    const id = route.params.id;
    const dispatch = useDispatch()
    let contact = useSelector(store => store.contacts.contact)

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                getContact(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [id]));

    function getContact(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(read_contact({ id, headers: headers }))
    }

    return (
        <ScrollView style={{minHeight: windowHeight}}>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingTop: 10 }}>
                <Text style={styles.section1Text}>{contact.name + " " + contact.last_name}</Text>
                <View style={styles.section2}>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                    <Text style={styles.contactDate}>{contact.date}</Text>
                </View>
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    section1Text: {
        fontWeight: '500',
        fontSize: 24,
        color: '#222222',
        textAlign: 'center',
        width: '60%',
    },
    section2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginTop: '5%',
    },
})

export default ContactDetails