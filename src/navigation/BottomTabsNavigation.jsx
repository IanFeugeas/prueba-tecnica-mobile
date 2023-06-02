import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from '../screens/Index';
import AuthForm from '../screens/AuthForm';
import Contacts from "../screens/Contacts"
import Logout from '../screens/LogOut';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AntDesign} from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

function BottomTabsNavigation() {
    let [token, setToken] = useState('')

    let state = useSelector(store => store.bottomTabsReducer.state)

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
    }, [state]));

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#1E90FF",
              borderTopColor: "transparent",
              height: 55,
              paddingBottom: 5,
              paddingTop: 5,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              marginBottom: 5,
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#9B9B9B",
            tabBarTabStyle: {
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}>
            
            <Tab.Screen name='Home' options={{
                headerShown: false, tabBarIcon: ({ size }) => (
                    <Ionicons name="home-outline" color="white" size={size} />
                ),
            }} component={Index} initialParams={{ state: 'register' }} />
            {token ? <></>
                :
                <>
                    <Tab.Screen name='Login' options={{
                        headerShown: false, tabBarIcon: ({ size }) => (
                            <FontAwesome5 name="user-circle" color="white" size={size} />
                        ),
                    }} component={AuthForm} initialParams={{ state: 'login' }} />
                </>
            }
            {token ? <Tab.Screen options={{
                headerShown: false, tabBarIcon: ({ size }) => (
                    <FontAwesome5 name="user-circle" color="white" size={size} />
                ),
            }} name='Clientes' component={Contacts} /> : <></>}
            {token ? <Tab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <AntDesign name="logout" size={24} color="white" />
                ),
            }} name='Salir' component={Logout} /> : <></>}
            </Tab.Navigator>
            )
}

export default BottomTabsNavigation