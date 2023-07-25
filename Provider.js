import React, { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useSharedValue } from 'react-native-reanimated';
import { Log } from './log';

export const PlayingContext = createContext({});

export const PlayingProvider = (props) => {
    const children = props.children;

    const [isPlaying, setIsPlaying] = useState(false);
    const [onStr, setOnStr] = useState(null);
    const [soundInfo, setSoundInfo] = useState({ duration: 0, position: 0, name: '', author: '', img: null });
    const [pos, setPos] = useState(0);
    const [song, setSong] = useState(null)
    const [songs, setSongs] = useState([])
    const [showMenu, setShowMenu] = useState({ id: '', show: false, ytId: '', title: '', author: '', img: null })
    const animVal = useSharedValue(10);
    
    const theValues = {     // << values we will share to our "children"
        isPlaying: isPlaying,
        onStr: onStr,
        soundInfo: soundInfo,
        pos: pos,
        setIsPlaying: setIsPlaying,
        setPos: setPos,
        setOnStr: setOnStr,
        setSoundInfo: setSoundInfo,
        playSound: playSound,
        onChangedDur: onChangedDur,
        setSound: setSong,
        sound: song,
        selectMusic: selectMusic,
        songs: songs,
        setSongs: setSongs,
        selectMusicTemp: selectMusicTemp,
        showMenu: showMenu,
        setShowMenu: setShowMenu,
        animVal: animVal,
    };

    function onChangedDur(v) {
        song.setPositionAsync(v)
    }

    async function playSound() {
        if (song === null) return
        if (isPlaying) {
            console.log('Pausing Sound');
            await song.pauseAsync();

            setIsPlaying(false);
        } else {
            console.log('Playing Sound');
            await song.playAsync();
            setIsPlaying(true)
        }
    }
    async function stopSound() {
        console.log('Stopping Sound');
        await song.stopAsync();
        await song.unloadAsync();
        
    }
    async function selectMusic(id) {
        if (isPlaying) {await song.pauseAsync()}
        songs.map((v, _) => {
            if (v.id === id) {
                setSoundInfo((e) => { let s = e; s.name = v.title; s.author = v.authorName; s.id = v.id; s.img = v.img; return s })
            }
        })

        const { sound } = await Audio.Sound.createAsync({ uri: FileSystem.documentDirectory + `/appDocs/files/${id.split('.')[0]}.mp3` }, {}, (status) => { setSoundInfo((e) => { let s = e; s.duration = status.durationMillis; s.position = status.positionMillis; return s }); setPos(status.positionMillis) });
        setSong(sound);

        await sound.playAsync();
        setIsPlaying(true)
    }
    async function selectMusicTemp(data, id) {
        if (isPlaying) {await song.pauseAsync()}
        Log.info("Loading...")
        setSoundInfo({name: data.title, author: data.artist.name, img: data.img})

        const { sound } = await Audio.Sound.createAsync({ uri: `http://192.168.3.168:3001/download/byMusicId/${data.id}` }, {}, (status) => { setSoundInfo((e) => { let s = e; s.duration = status.durationMillis; s.position = status.positionMillis; return s }); setPos(status.positionMillis) });
        setSong(sound);

        await sound.playAsync();
        Log.info("Loaded!")
        setIsPlaying(true)
    }


    return (
        <PlayingContext.Provider value={theValues}>
            {children}
        </PlayingContext.Provider>
    );
}