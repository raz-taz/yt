import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, ScrollView, RefreshControl, Pressable } from 'react-native';
import BottomBar, { EnterButton, PlayingSpace, SearchRez, SongBox, SongMenu, TopBar } from './Components';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import { PlayingContext } from './Provider';



export default function SearchScreen({ navigation }) {
    const [focus, setFocus] = useState(false)
    const [srch, setSrch] = useState('billie')
    const [items, setItems] = useState([{"artist": {"id": null, "name": null}, "id": null, "img": null, "title": null}])

    const { selectMusicTemp } = useContext(PlayingContext);

    const search = async () => {
        console.log('getting...')
    
        try {
            let response = await fetch(`http://192.168.3.168:3001/search/${srch}`);
            const recivedData = await response.json()
            console.log("data from JSON: ", recivedData)
            setItems(recivedData)
        } catch (e) {
            console.log('error: ', e)
        }
    }

    const openRez = async (data)=>{
        console.log(data)
        selectMusicTemp(data)
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} />
            <TopBar at={"Search"} />
            <View style={styles.searchInputDiv}>
                <TextInput value={srch} onChangeText={(e) => setSrch(e)} style={focus === true ? styles.searchInputOnFocus : styles.searchInput} onFocus={() => { setFocus(true); console.log(true) }} onBlur={() => { setFocus(false); console.log(false) }} placeholder="Search A Song Or An Artist" />

                <Pressable style={{ marginLeft: 20, backgroundColor: '#fff', marginTop: 0 }} onPress={() => search()}>
                    <Ionicons name='search' size={30} color={'#fff'} />
                </Pressable>
            </View>
            <View style={{ width: '100%', height: '50%', marginTop: '50%'}}>
                <ScrollView style={[styles.scrollViews]} contentContainerStyle={styles.contentContainer} >

                    {
                        items.map((v, i) => {
                            return (<SearchRez authorName={v.artist.name} key={i} songName={v.title} img={v.img} onClick={()=>openRez(v)} />)
                        })
                    }

                </ScrollView>
            </View>
            
            <BottomBar nav={navigation} at="Search" />
        </View>
    )
}