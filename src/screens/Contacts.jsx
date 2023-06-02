import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native';
import Search from '../components/Search';
import ContactsCards from '../components/ContactsCards';
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Contactos() {

  return (
    <ScrollView style={styles.contacts}>
      <Search style={styles.Search}/>
      <ContactsCards style={styles.cards}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contacts: {
    height: '100%',
    backgroundColor: "white"
  },
})

export default Contactos