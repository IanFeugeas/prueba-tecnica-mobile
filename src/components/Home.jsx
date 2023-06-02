import React from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Home() {
    let [token, setToken] = useState('')

    useFocusEffect(React.useCallback(() => {
        async function getToken() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getToken();
    }, []));

    const navigation = useNavigation()
    
    function navigateContactos(){
        if(token){
            navigation.navigate('Clientes');
        }else{
            navigation.navigate('Login');
        }
    }

    return (
        <View style={styles.home}>       
                <View style={styles.exploreSection}>
                    <Text style={styles.exploreTitle}>Administre y organice su lista de clientes</Text>
                
                    <TouchableOpacity onPress={navigateContactos} style={styles.exploreBtn}><Text style={styles.textBtn}>Clientes</Text></TouchableOpacity>
                </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        width: windowWidth,
        height: windowHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    exploreSection: {
        width: 300,
        height: 204,
        gap: 80,
        margin: 0,
        alignItems: 'center',  
    },
    exploreTitle: {
        fontWeight: 'bold',
        fontSize: 35,
        textShadowColor: 'rgba(255, 255, 255, 0.25)',
        textShadowOffset: {width: 1, height: 8},
        textShadowRadius: 50,
        color: "#3CB371",
        textAlign: 'center'
    },
    exploreBtn: {
        width: 240,
        height: 55,
        backgroundColor: '#1E90FF',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 24,
        textDecorationLine: 'none',
    }
});

export default Home