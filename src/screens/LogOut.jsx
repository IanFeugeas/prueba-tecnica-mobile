import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import bottomTabsActions from '../store/ReloadBottomTabs/actions';
import contactClickActions from '../store/ContactClicked/action';
import detailsClickActions from '../store/DetailsClicked/actions';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const { reloadBottomTabs } = bottomTabsActions
const { contactClicked } = contactClickActions
const { detailsClicked } = detailsClickActions

function Logout() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  let state = useSelector(store => store)
  let dispatch = useDispatch()

  useEffect(() => {
    async function handleLogout() {
      setLoading(true)
      try {
        const token = await AsyncStorage.getItem('token');
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let url = 'https://prueba-tecnica-minicrm.onrender.com/auth/signout'
        await axios.post(url, "", headers)
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('user')
        console.log('Logout')
        dispatch(reloadBottomTabs({ state: !state }))
        dispatch(contactClicked({ state: false }))
        dispatch(detailsClicked({state: false}))
        setLoading(false)
        setTimeout(() => navigation.navigate('Home'), 5000)
      } catch (error) {
        console.log(error);
      }
    }
    handleLogout();
  }, []);

  return (
    <ScrollView>
      <View style={styles.logout}>
        <Text style={styles.btnText}>Te estas desconectando</Text>
        <Text style={styles.btnText}>Aguarde unos segundos!</Text>
      </View>
      <Spinner visible={loading} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logout: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 400
  },
  
    btnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 17,
    },
})

export default Logout