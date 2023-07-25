import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, ScrollView, RefreshControl } from 'react-native';
import BottomBar, { EnterButton, PlayingSpace, SongBox, SongMenu, TopBar } from './Components';
import styles from './styles';


import Animated, {
    useSharedValue,
} from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import { addSong, deleteFunc } from './functions';
import { PlayingContext } from './Provider';
const APPDOC_FILES = FileSystem.documentDirectory + 'appDocs/files';
const APPDOC_INFO = FileSystem.documentDirectory + 'appDocs/info';

export default function HomeScreen({ navigation }) {
    

    const [refreshing, setRefreshing] = useState(false);
    //const [isplaying, setIsPlaying] = useState(false);
    const { setShowMenu, selectMusic, soundInfo, playSound, setValue, songs, setSongs, animVal } = useContext(PlayingContext);






    // useEffect(() => {
    //     return sound
    //         ? () => {
    //             console.log('Unloading Sound');
    //             sound.unloadAsync();
    //         }
    //         : undefined;
    // }, [sound]);playSound
    const refresh = async () => {
        console.log('refreshing...');
        const newSongs = [];
        try {

            let res = await FileSystem.getInfoAsync(
                APPDOC_INFO
            );

            if (res.exists) {
                const path = APPDOC_INFO;
                const infoFiles = await FileSystem.readDirectoryAsync(path);
                let fileUri;
                for (let infoFile of infoFiles) {
                    fileUri = `${APPDOC_INFO}/${infoFile}`;

                    try {
                        const fileContent = await FileSystem.readAsStringAsync(fileUri);
                        const theFileContent = JSON.parse(fileContent);

                        newSongs.push({
                            id: infoFile,
                            title: theFileContent.title,
                            authorName: theFileContent.authorName,
                            img: theFileContent.image,
                            ytId: theFileContent.id,
                        });
                    } catch (error) {
                        console.error(`Failed to process ${fileUri}`, error.message);
                    }
                }
            } else {
                console.log('file folder does not exists, creating one...');
                const path = APPDOC_INFO;
                try {
                    await FileSystem.makeDirectoryAsync(path);
                } catch (error) {
                    console.error(`Failed to create dir (${path})`);
                }
            }
        } finally {
            setSongs(newSongs);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    function openMenu(id, ytId, t, a, img) {
        setShowMenu({ id: id, show: true, ytId: ytId, title: t, author: a, img: img })
        animVal.value = 0;
    } playSound
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(()=>{
            setRefreshing(false);
        }, 1000)
        refresh()
    }, []);
    
    
    return (
        <View style={styles.container}>
            <StatusBar hidden={false} />
            <TopBar at={"Home"} />
            {/* <SongMenu animVal={value} show={menu} info={{ name: menu.title, author: menu.author, img: menu.img }} ytFunc={() => Linking.openURL(`https://www.youtube.com/watch?v=${menu.ytId}`)} onClose={() => { value.value = -350; setTimeout(() => { setMenu({ id: '', show: false, ytId: '' }); }, 500) }} deleteFunc={() => { deleteFunc(menu.id); refresh(); setMenu({ id: '', show: false }) }} /> */}
            <View style={{ height: '65%', width: '100%', marginTop: "30%", }}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {
                        songs.map((val, i) => {
                            return (<SongBox selected={val.id === soundInfo.id ? true : false} key={i} img={val.img} songName={val.title} authorName={val.authorName} onHold={() => openMenu(val.id, val.ytId, val.title, val.author, val.img)} onClick={() => selectMusic(val.id)} />)
                        })
                    }
                    <View style={{ height: 30 }} />
                </ScrollView>
            </View>
            {/* <PlayingSpace pos={pos} onValueChanged={(v) => onChangedDur(v)} soundInfo={soundInfo} onPausePressed={() => playSound()} playing={isplaying} /> */}
            <BottomBar nav={navigation} at="Home" />
        </View>
    )
}





