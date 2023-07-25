import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, ScrollView, RefreshControl } from 'react-native';
import BottomBar, { EnterButton, PlayingSpace, SongBox, SongMenu, TopBar } from './Components';
import styles from './styles';
import { addSong } from './functions';

export default function AddScreen({ navigation }) {
    const [id, setId] = useState('');
    return (
        <View style={styles.container}>
            <StatusBar hidden={false} />
            <TopBar at={"Add songs"} />
            <View style={styles.addDiv}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput onChangeText={setId} value={id} placeholderTextColor={'grey'} placeholder='Enter the YouTube Id...' style={styles.inputId} />
                    <EnterButton onPress={() => addSong(id)} />
                </View>
            </View>
            <BottomBar nav={navigation} at="Add" />
        </View>
    )
}