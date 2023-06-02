import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import textActions from '../store/SearchBar/actions'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import loupe from '../../images/assets/Search.png'

const { captureText } = textActions

function Search() {

    const dispatch = useDispatch()
    function handleSearch(text) {
        dispatch(captureText({ inputText: text }))
    }

    return (
        <ScrollView>
            <View style={styles.searchBar}>
                <Image source={loupe} style={styles.loupe} />
                <TextInput style={styles.inputText} placeholder='Buscar' onChangeText={handleSearch} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 50,
        marginLeft: 10,
        padding: 5,
        gap: 2,
        width: "95%",
        height: 50,
        borderRadius: 20,
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
    },
    loupe: {
        height: 30,
        width: 30,
    },
    inputText: {
        width: '90%',
        overflow: 'hidden',
        fontSize: 20
    }
})

export default Search