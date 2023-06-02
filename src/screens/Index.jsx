import React from 'react'
import { ScrollView } from "react-native";
import AuthForm from './AuthForm'
import Home from '../components/Home';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

function Index() {
    let state = 'register'

    let [token, setToken] = useState('')

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
        <ScrollView style={{height: '200%'}}>
            <Home/>
            {token ? '' : <AuthForm state={state} />}
        </ScrollView>
    );
}

export default Index